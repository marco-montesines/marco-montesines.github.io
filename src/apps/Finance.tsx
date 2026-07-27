import { useMemo, useState, type ReactNode } from "react";
import { intlLocale, useLocale, useUI, type UIStrings } from "../i18n";

/** German flat tax on capital gains: 25% + 5.5% Soli on the tax. */
const ABGELTUNG = 0.26375;

const useFmt = () => {
  const locale = intlLocale(useLocale());
  return useMemo(
    () => ({
      euro: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    }),
    [locale],
  );
};

function Field({
  label,
  value,
  onChange,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="fin-field">
      <span>{label}</span>
      <span className="fin-input">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={0}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        />
        {suffix && <em>{suffix}</em>}
      </span>
    </label>
  );
}

function Results({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="fin-results">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- chart ---------- */

interface Series {
  label: string;
  color: string;
  values: number[]; // one value per year, index 0..years
}

const W = 520;
const H = 210;
const PAD = { l: 46, r: 10, t: 10, b: 20 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

const niceCeil = (v: number) => {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 2.5, 5, 10]) if (v <= m * p) return m * p;
  return 10 * p;
};

function Chart({
  series,
  stacked = false,
  target,
  tipFmt,
}: {
  series: Series[];
  stacked?: boolean;
  target?: { value: number; label: string };
  tipFmt: (n: number) => string;
}) {
  const fmt = useFmt();
  const [hover, setHover] = useState<number | null>(null);
  const years = series[0].values.length - 1;

  const tops = stacked
    ? series[0].values.map((_, i) =>
        series.reduce((s, ser) => s + ser.values[i], 0),
      )
    : series.flatMap((s) => s.values);
  const ymax = niceCeil(Math.max(...tops, target?.value ?? 0) * 1.05);

  const x = (i: number) => PAD.l + (i / years) * PW;
  const y = (v: number) => PAD.t + PH - (v / ymax) * PH;

  // cumulative stacks bottom-up: cum[k][i] = sum of series 0..k at year i
  const cum = series.map((_, k) =>
    series[0].values.map((_, i) =>
      series.slice(0, k + 1).reduce((s, ser) => s + ser.values[i], 0),
    ),
  );

  const line = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const area = (topVals: number[], botVals?: number[]) => {
    const top = line(topVals);
    const bottom = botVals
      ? botVals
          .map((_, i) => `L${x(years - i)},${y(botVals[years - i])}`)
          .join(" ")
      : `L${x(years)},${y(0)} L${x(0)},${y(0)}`;
    return `${top} ${bottom} Z`;
  };

  const gridVals = [0.25, 0.5, 0.75, 1].map((f) => f * ymax);
  const xtickEvery = years > 40 ? 10 : years > 15 ? 5 : years > 8 ? 2 : 1;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((mx - PAD.l) / PW) * years);
    setHover(Math.max(0, Math.min(years, i)));
  };

  return (
    <div className="chart-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {gridVals.map((v) => (
          <g key={v}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(v)}
              y2={y(v)}
              className="chart-grid"
            />
            <text x={PAD.l - 6} y={y(v) + 3} className="chart-tick" textAnchor="end">
              {fmt.compact.format(v)}
            </text>
          </g>
        ))}
        {series.map((s, k) => {
          const topVals = stacked ? cum[k] : s.values;
          const botVals = stacked && k > 0 ? cum[k - 1] : undefined;
          return (
            <g key={s.label}>
              <path
                d={area(topVals, botVals)}
                fill={s.color}
                opacity={stacked ? 0.55 : k === 0 ? 0.22 : 0}
              />
              <path
                d={line(topVals)}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
        {target && (
          <g>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(target.value)}
              y2={y(target.value)}
              className="chart-target"
            />
            <text
              x={W - PAD.r}
              y={y(target.value) - 4}
              className="chart-tick"
              textAnchor="end"
            >
              {target.label}
            </text>
          </g>
        )}
        {series[0].values.map((_, i) =>
          i % xtickEvery === 0 || i === years ? (
            <text
              key={i}
              x={x(i)}
              y={H - 6}
              className="chart-tick"
              textAnchor="middle"
            >
              {i}
            </text>
          ) : null,
        )}
        {hover != null && (
          <g>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={PAD.t}
              y2={PAD.t + PH}
              className="chart-cross"
            />
            {series.map((s, k) => (
              <circle
                key={s.label}
                cx={x(hover)}
                cy={y(stacked ? cum[k][hover] : s.values[hover])}
                r="3.5"
                fill={s.color}
                className="chart-dot"
              />
            ))}
          </g>
        )}
      </svg>
      {hover != null && (
        <div
          className="chart-tip"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            transform: `translateX(${hover > years / 2 ? "calc(-100% - 10px)" : "10px"})`,
          }}
        >
          <strong>{hover}</strong>
          {series.map((s) => (
            <span key={s.label}>
              <i style={{ background: s.color }} />
              {s.label}: {tipFmt(s.values[hover])}
            </span>
          ))}
        </div>
      )}
      <div className="chart-legend">
        {series.map((s) => (
          <span key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        {target && (
          <span>
            <i className="chart-legend-dash" />
            {target.label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- calculators ---------- */

const C1 = "var(--chart-1)";
const C2 = "var(--chart-2)";

function Savings({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(20);
  const [deTax, setDeTax] = useState(true);
  const [allowance, setAllowance] = useState(1000);

  const i = rate / 100 / 12;
  const yr = Math.max(1, Math.min(60, Math.round(years)));
  const contributions: number[] = [];
  const growth: number[] = [];
  for (let t = 0; t <= yr; t++) {
    const n = t * 12;
    const g = (1 + i) ** n;
    const total = i === 0 ? initial + monthly * n : initial * g + monthly * ((g - 1) / i);
    contributions.push(initial + monthly * n);
    growth.push(total - (initial + monthly * n));
  }
  const future = contributions[yr] + growth[yr];
  const tax = deTax
    ? Math.max(0, growth[yr] - allowance * yr) * ABGELTUNG
    : 0;

  const rows: [string, string][] = [
    [ui.futureValue, fmt.euro.format(future)],
    [ui.totalInvested, fmt.euro.format(contributions[yr])],
    [ui.growthEarned, fmt.euro.format(growth[yr])],
  ];
  if (deTax) {
    rows.push(
      [ui.taxesLabel, `−${fmt.euro.format(tax)}`],
      [ui.afterTaxLabel, fmt.euro.format(future - tax)],
    );
  }

  return (
    <>
      <div className="fin-grid">
        <Field label={ui.startingAmount} value={initial} onChange={setInitial} step={500} suffix="€" />
        <Field label={ui.monthlyContribution} value={monthly} onChange={setMonthly} step={50} suffix="€" />
        <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.1} suffix="%" />
        <Field label={ui.years} value={years} onChange={setYears} />
      </div>
      <label className="fin-check">
        <input
          type="checkbox"
          checked={deTax}
          onChange={(e) => setDeTax(e.target.checked)}
        />
        {ui.deTaxToggle}
      </label>
      {deTax && (
        <Field label={ui.allowanceLabel} value={allowance} onChange={setAllowance} step={100} suffix="€" />
      )}
      <Chart
        stacked
        series={[
          { label: ui.contributionsLabel, color: C1, values: contributions },
          { label: ui.interestLabel, color: C2, values: growth },
        ]}
        tipFmt={(n) => fmt.euro.format(n)}
      />
      <Results rows={rows} />
    </>
  );
}

function Loan({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(3.8);
  const [years, setYears] = useState(25);

  const i = rate / 100 / 12;
  const yr = Math.max(1, Math.min(50, Math.round(years)));
  const n = yr * 12;
  const monthly = i === 0 ? principal / n : (principal * i) / (1 - (1 + i) ** -n);

  const balance: number[] = [principal];
  const cumInterest: number[] = [0];
  let bal = principal;
  let paidInterest = 0;
  for (let m = 1; m <= n; m++) {
    const int = bal * i;
    paidInterest += int;
    bal = Math.max(0, bal + int - monthly);
    if (m % 12 === 0) {
      balance.push(bal);
      cumInterest.push(paidInterest);
    }
  }

  return (
    <>
      <div className="fin-grid">
        <Field label={ui.loanAmount} value={principal} onChange={setPrincipal} step={5000} suffix="€" />
        <Field label={ui.annualInterest} value={rate} onChange={setRate} step={0.1} suffix="%" />
        <Field label={ui.years} value={years} onChange={setYears} />
      </div>
      <Chart
        series={[
          { label: ui.remainingDebt, color: C1, values: balance },
          { label: ui.interestPaid, color: C2, values: cumInterest },
        ]}
        tipFmt={(v) => fmt.euro.format(v)}
      />
      <Results
        rows={[
          [ui.monthlyPayment, fmt.euro.format(monthly)],
          [ui.totalPaid, fmt.euro.format(monthly * n)],
          [ui.totalInterest, fmt.euro.format(monthly * n - principal)],
        ]}
      />
    </>
  );
}

function Freedom({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [expenses, setExpenses] = useState(2500);
  const [withdrawal, setWithdrawal] = useState(4);
  const [initial, setInitial] = useState(25000);
  const [monthly, setMonthly] = useState(750);
  const [rate, setRate] = useState(6);

  const target = withdrawal > 0 ? (expenses * 12) / (withdrawal / 100) : 0;
  const i = rate / 100 / 12;
  const HORIZON = 50;
  const capital: number[] = [initial];
  let cap = initial;
  let reachedMonth: number | null = null;
  for (let m = 1; m <= HORIZON * 12; m++) {
    cap = cap * (1 + i) + monthly;
    if (reachedMonth === null && target > 0 && cap >= target) reachedMonth = m;
    if (m % 12 === 0) capital.push(cap);
  }
  const chartYears =
    reachedMonth !== null
      ? Math.min(HORIZON, Math.max(10, Math.ceil(reachedMonth / 12) + 5))
      : HORIZON;

  return (
    <>
      <div className="fin-grid">
        <Field label={ui.monthlyExpenses} value={expenses} onChange={setExpenses} step={100} suffix="€" />
        <Field label={ui.withdrawalRate} value={withdrawal} onChange={setWithdrawal} step={0.5} suffix="%" />
        <Field label={ui.startingAmount} value={initial} onChange={setInitial} step={1000} suffix="€" />
        <Field label={ui.monthlyContribution} value={monthly} onChange={setMonthly} step={50} suffix="€" />
        <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.5} suffix="%" />
      </div>
      <Chart
        series={[
          {
            label: ui.capitalLabel,
            color: C2,
            values: capital.slice(0, chartYears + 1),
          },
        ]}
        target={{ value: target, label: ui.targetLabel }}
        tipFmt={(v) => fmt.euro.format(v)}
      />
      <Results
        rows={[
          [ui.neededCapital, fmt.euro.format(target)],
          [
            ui.reachedIn,
            reachedMonth !== null
              ? `≈ ${Math.ceil(reachedMonth / 12)} ${ui.yearsWord}`
              : ui.notReached,
          ],
        ]}
      />
    </>
  );
}

export function Finance() {
  const ui = useUI();
  const [tab, setTab] = useState(0);
  const tabs: [string, ReactNode][] = [
    [ui.financeTabs[0], <Savings key="s" ui={ui} />],
    [ui.financeTabs[1], <Loan key="l" ui={ui} />],
    [ui.financeTabs[2], <Freedom key="f" ui={ui} />],
  ];
  return (
    <div className="finance app-pad">
      <div className="settings-row-group">
        {tabs.map(([name], idx) => (
          <button
            key={name}
            className={`settings-chip ${idx === tab ? "settings-chip-sel" : ""}`}
            onClick={() => setTab(idx)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="fin-body">{tabs[tab][1]}</div>
      <p className="settings-hint">{ui.financeNote}</p>
    </div>
  );
}
