import { useMemo, useState, type ReactNode } from "react";
import { intlLocale, useLocale, useUI, type UIStrings } from "../i18n";

/**
 * Capital-gains tax presets, parallel to ui.taxOptions: German Abgeltung-
 * steuer variants (± church tax, ETF partial exemption), Austrian KESt,
 * tax-free, and null = custom rate.
 */
const TAX_RATES: (number | null)[] = [
  26.375, 27.819, 27.99, 18.46, 19.47, 19.59, 27.5, 0, null,
];

/** Compounding periods per year, parallel to ui.intervalOptions. */
const INTERVALS = [1, 2, 4, 12, 365];

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

function Info({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="fin-info" title={text} aria-label={text} role="img">
      ⓘ
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1,
  suffix,
  info,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  suffix?: string;
  info?: string;
}) {
  return (
    <label className="fin-field">
      <span>
        {label}
        <Info text={info} />
      </span>
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

function SelectField({
  label,
  value,
  onChange,
  options,
  info,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  options: readonly string[];
  info?: string;
}) {
  return (
    <label className="fin-field">
      <span>
        {label}
        <Info text={info} />
      </span>
      <select
        className="fin-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((o, idx) => (
          <option key={o} value={idx}>
            {o}
          </option>
        ))}
      </select>
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
  const [mode, setMode] = useState(1); // 0 one-time, 1 regular deposits
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(20);
  const [intervalIdx, setIntervalIdx] = useState(0);
  const [taxIdx, setTaxIdx] = useState(0);
  const [customRate, setCustomRate] = useState(26.375);
  const [allowance, setAllowance] = useState(1000);
  const taxRate = (TAX_RATES[taxIdx] ?? customRate) / 100;

  const deposit = mode === 1 ? monthly : 0;
  const m = INTERVALS[intervalIdx];
  // nominal annual rate compounded m times/year, expressed per month
  const monthlyFactor = (1 + rate / 100 / m) ** (m / 12);
  const yr = Math.max(1, Math.min(60, Math.round(years)));
  const contributions: number[] = [initial];
  const growth: number[] = [0];
  let cap = initial;
  for (let month = 1; month <= yr * 12; month++) {
    cap = cap * monthlyFactor + deposit;
    if (month % 12 === 0) {
      const paidIn = initial + deposit * month;
      contributions.push(paidIn);
      growth.push(cap - paidIn);
    }
  }
  const future = contributions[yr] + growth[yr];
  const tax = Math.max(0, growth[yr] - allowance * yr) * taxRate;

  const rows: [string, string][] = [
    [ui.futureValue, fmt.euro.format(future)],
    [ui.totalInvested, fmt.euro.format(contributions[yr])],
    [ui.growthEarned, fmt.euro.format(growth[yr])],
  ];
  if (taxRate > 0) {
    rows.push(
      [ui.taxesLabel, `−${fmt.euro.format(tax)}`],
      [ui.afterTaxLabel, fmt.euro.format(future - tax)],
    );
  }

  return (
    <>
      <div className="fin-card">
      <SelectField
        label={ui.calcTypeLabel}
        value={mode}
        onChange={setMode}
        options={ui.calcTypeOptions}
        info={ui.infoCalcType}
      />
      <div className="fin-grid">
        <Field label={ui.startingAmount} value={initial} onChange={setInitial} step={500} suffix="€" info={ui.infoStarting} />
        {mode === 1 && (
          <Field label={ui.monthlyContribution} value={monthly} onChange={setMonthly} step={50} suffix="€" info={ui.infoMonthly} />
        )}
        <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.1} suffix="%" info={ui.infoReturn} />
        <Field label={ui.years} value={years} onChange={setYears} info={ui.infoYears} />
      </div>
      <SelectField
        label={ui.intervalLabel}
        value={intervalIdx}
        onChange={setIntervalIdx}
        options={ui.intervalOptions}
        info={ui.infoInterval}
      />
      <SelectField
        label={ui.taxRateLabel}
        value={taxIdx}
        onChange={setTaxIdx}
        options={ui.taxOptions}
        info={ui.infoTax}
      />
      {TAX_RATES[taxIdx] === null && (
        <Field label={ui.taxRateLabel} value={customRate} onChange={setCustomRate} step={0.1} suffix="%" />
      )}
      {taxRate > 0 && (
        <Field label={ui.allowanceLabel} value={allowance} onChange={setAllowance} step={100} suffix="€" info={ui.infoAllowance} />
      )}
      </div>
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
      <div className="fin-card">
        <div className="fin-grid">
          <Field label={ui.loanAmount} value={principal} onChange={setPrincipal} step={5000} suffix="€" />
          <Field label={ui.annualInterest} value={rate} onChange={setRate} step={0.1} suffix="%" />
          <Field label={ui.years} value={years} onChange={setYears} info={ui.infoYears} />
        </div>
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
      <div className="fin-card">
        <div className="fin-grid">
          <Field label={ui.monthlyExpenses} value={expenses} onChange={setExpenses} step={100} suffix="€" />
          <Field label={ui.withdrawalRate} value={withdrawal} onChange={setWithdrawal} step={0.5} suffix="%" info={ui.infoWithdrawal} />
          <Field label={ui.startingAmount} value={initial} onChange={setInitial} step={1000} suffix="€" info={ui.infoStarting} />
          <Field label={ui.monthlyContribution} value={monthly} onChange={setMonthly} step={50} suffix="€" info={ui.infoMonthly} />
          <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.5} suffix="%" info={ui.infoReturn} />
        </div>
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
