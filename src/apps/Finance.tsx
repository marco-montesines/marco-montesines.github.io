import { useMemo, useState, type ReactNode } from "react";
import { intlLocale, useLocale, useUI, type UIStrings } from "../i18n";

/**
 * Capital-gains tax presets, parallel to ui.taxOptions. `rate` is the full
 * statutory rate; `exempt` the ETF Teilfreistellung share of gains that is
 * tax-free (applied BEFORE the Sparerpauschbetrag, as § 20 InvStG orders
 * it). The dropdown labels show the resulting effective rates (e.g.
 * 27.99 % × 0.7 = 19.59 %). null = custom flat rate.
 */
const TAX_PRESETS: ({ rate: number; exempt: number } | null)[] = [
  { rate: 26.375, exempt: 0 },
  { rate: 27.819, exempt: 0 },
  { rate: 27.99, exempt: 0 },
  { rate: 26.375, exempt: 0.3 },
  { rate: 27.819, exempt: 0.3 },
  { rate: 27.99, exempt: 0.3 },
  { rate: 27.5, exempt: 0 },
  { rate: 0, exempt: 0 },
  null,
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
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      compact: new Intl.NumberFormat(locale, {
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      num: new Intl.NumberFormat(locale, { maximumFractionDigits: 3 }),
    }),
    [locale],
  );
};

const TIP_W = 230;

function Info({ text }: { text?: string }) {
  // fixed-position so window overflow can never clip the tooltip
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    below: boolean;
  } | null>(null);
  if (!text) return null;

  const show = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const below = r.top < 140;
    setTip({
      x: Math.min(
        Math.max(8, r.left + r.width / 2 - TIP_W / 2),
        window.innerWidth - TIP_W - 8,
      ),
      y: below ? r.bottom + 7 : window.innerHeight - r.top + 7,
      below,
    });
  };

  return (
    <span
      className="fin-info"
      tabIndex={0}
      aria-label={text}
      onMouseEnter={show}
      onMouseLeave={() => setTip(null)}
      onFocus={show}
      onBlur={() => setTip(null)}
    >
      ⓘ
      {tip && (
        <span
          className="fin-tip"
          role="tooltip"
          style={
            tip.below
              ? { left: tip.x, top: tip.y }
              : { left: tip.x, bottom: tip.y }
          }
        >
          {text}
        </span>
      )}
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

function Toggle({
  label,
  checked,
  onChange,
  info,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
  info?: string;
}) {
  return (
    <label className="fin-field fin-check">
      <span>
        {label}
        <Info text={info} />
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

function Faq({ ui, items }: { ui: UIStrings; items: [string, string][] }) {
  return (
    <section className="fin-faq">
      <h3>{ui.faqTitle}</h3>
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

function HeroCard({
  title,
  value,
  tiles,
  rows,
}: {
  title: string;
  value: string;
  tiles?: [string, string, boolean?][];
  rows?: [string, string][];
}) {
  return (
    <div className="fin-hero">
      <span className="fin-hero-label">{title}</span>
      <strong className="fin-hero-value">{value}</strong>
      {tiles && (
        <div className="fin-hero-tiles">
          {tiles.map(([k, v, accent]) => (
            <div key={k}>
              <span>{k}</span>
              <strong className={accent ? "fin-pos" : undefined}>{v}</strong>
            </div>
          ))}
        </div>
      )}
      {rows && (
        <dl className="fin-hero-rows">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
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
  const [intervalIdx, setIntervalIdx] = useState(3); // monthly, the Sparplan norm
  const [taxIdx, setTaxIdx] = useState(0);
  const [customRate, setCustomRate] = useState(26.375);
  const [allowance, setAllowance] = useState(1000);
  const [dynOn, setDynOn] = useState(false);
  const [dyn, setDyn] = useState(2);
  const preset = TAX_PRESETS[taxIdx];
  const taxRate = (preset?.rate ?? customRate) / 100;
  const exempt = preset?.exempt ?? 0;

  let deposit = mode === 1 ? monthly : 0;
  const m = INTERVALS[intervalIdx];
  // nominal annual rate compounded m times/year, expressed per month
  const monthlyFactor = (1 + rate / 100 / m) ** (m / 12);
  const yr = Math.max(1, Math.min(60, Math.round(years)));
  const contributions: number[] = [initial];
  const growth: number[] = [0];
  let cap = initial;
  let paidIn = initial;
  for (let month = 1; month <= yr * 12; month++) {
    cap = cap * monthlyFactor + deposit;
    paidIn += deposit;
    if (month % 12 === 0) {
      contributions.push(paidIn);
      growth.push(cap - paidIn);
      if (dynOn && mode === 1) deposit *= 1 + dyn / 100;
    }
  }
  const future = contributions[yr] + growth[yr];
  // Accumulated gains realize in the sale year, so the Sparerpauschbetrag
  // counts ONCE: Teilfreistellung first, then one allowance, then the rate.
  const tax =
    Math.max(0, growth[yr] * (1 - exempt) - allowance) * taxRate;

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
      {mode === 1 && (
        <Toggle
          label={ui.dynamicsToggle}
          checked={dynOn}
          onChange={setDynOn}
          info={ui.infoDynamics}
        />
      )}
      {mode === 1 && dynOn && (
        <div className="fin-grid">
          <Field label={ui.dynamicsRate} value={dyn} onChange={setDyn} step={0.5} suffix="%" info={ui.infoDynamics} />
        </div>
      )}
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
      {preset === null && (
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
      <HeroCard
        title={ui.endValueTitle}
        value={fmt.euro.format(future)}
        tiles={[
          [ui.paidInLabel, fmt.euro.format(contributions[yr])],
          [ui.gainLabel, fmt.euro.format(growth[yr]), true],
        ]}
      />
      {taxRate > 0 && (
        <HeroCard
          title={ui.afterTaxTitle}
          value={fmt.euro.format(future - tax)}
          rows={[
            [ui.netEarnings, fmt.euro.format(future - tax - contributions[yr])],
            [ui.taxesWithheld, fmt.euro.format(tax)],
          ]}
        />
      )}
      <Faq ui={ui} items={ui.faqSavings} />
    </>
  );
}

function Loan({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(3.8);
  const [years, setYears] = useState(25);
  const [deduct, setDeduct] = useState(false);
  const [marginal, setMarginal] = useState(42);

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

  const totalInterest = monthly * n - principal;
  const saved = deduct ? totalInterest * (marginal / 100) : 0;

  const rows: [string, string][] = [
    [ui.monthlyPayment, fmt.euro.format(monthly)],
    [ui.totalPaid, fmt.euro.format(monthly * n)],
    [ui.totalInterest, fmt.euro.format(totalInterest)],
  ];
  if (deduct) {
    rows.push(
      [ui.taxSaved, `−${fmt.euro.format(saved)}`],
      [ui.interestAfterTax, fmt.euro.format(totalInterest - saved)],
    );
  }

  return (
    <>
      <div className="fin-card">
        <div className="fin-grid">
          <Field label={ui.loanAmount} value={principal} onChange={setPrincipal} step={5000} suffix="€" info={ui.infoLoanAmount} />
          <Field label={ui.annualInterest} value={rate} onChange={setRate} step={0.1} suffix="%" info={ui.infoLoanRate} />
          <Field label={ui.years} value={years} onChange={setYears} info={ui.infoLoanTerm} />
        </div>
        <Toggle
          label={ui.deductToggle}
          checked={deduct}
          onChange={setDeduct}
          info={ui.infoDeduct}
        />
        {deduct && (
          <div className="fin-grid">
            <Field label={ui.marginalRate} value={marginal} onChange={setMarginal} step={1} suffix="%" info={ui.infoMarginal} />
          </div>
        )}
      </div>
      <Chart
        series={[
          { label: ui.remainingDebt, color: C1, values: balance },
          { label: ui.interestPaid, color: C2, values: cumInterest },
        ]}
        tipFmt={(v) => fmt.euro.format(v)}
      />
      <Results rows={rows} />
      <Faq ui={ui} items={ui.faqLoan} />
    </>
  );
}

/** Periods per year, parallel to ui.withdrawIntervalOptions. */
const WITHDRAW_PERIODS = [12, 4, 1];

function Withdrawal({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [solve, setSolve] = useState(2); // 0 capital, 1 amount, 2 duration
  const [capital, setCapital] = useState(500000);
  const [amount, setAmount] = useState(2500);
  const [intervalIdx, setIntervalIdx] = useState(0);
  const [rate, setRate] = useState(5);
  const [deplete, setDeplete] = useState(true);
  const [duration, setDuration] = useState(25);
  const [taxIdx, setTaxIdx] = useState(0);
  const [customRate, setCustomRate] = useState(26.375);
  const [allowance, setAllowance] = useState(1000);

  const p = WITHDRAW_PERIODS[intervalIdx];
  const j = rate / 100 / p;
  const n = Math.max(1, Math.round(duration)) * p;
  const preset = TAX_PRESETS[taxIdx];
  const trate = (preset?.rate ?? customRate) / 100;
  const ex = preset?.exempt ?? 0;
  const allow = trate > 0 ? Math.max(0, allowance) : 0;

  // Each period's gains are taxed (Teilfreistellung first, then whatever is
  // left of the year's allowance), then the withdrawal is taken out.
  const sim = (c0: number, w: number, maxYears: number) => {
    const yearly: number[] = [c0];
    let cap = c0;
    let taxes = 0;
    let allowLeft = allow;
    let zeroAt: number | null = null;
    for (let t = 1; t <= maxYears * p; t++) {
      const gain = cap * j;
      const taxable = Math.max(0, gain * (1 - ex) - allowLeft);
      allowLeft = Math.max(0, allowLeft - gain * (1 - ex));
      taxes += taxable * trate;
      cap = cap + gain - taxable * trate - w;
      if (cap <= 0 && zeroAt === null) {
        cap = 0;
        zeroAt = t;
      }
      if (t % p === 0) {
        yearly.push(cap);
        allowLeft = allow;
      }
    }
    return { yearly, zeroAt, taxes, capEnd: cap };
  };

  const sustainable = (c0: number, w: number) =>
    c0 > 0 && sim(c0, w, 1).capEnd >= c0 - 1e-6;

  // resolve the missing value from the other two (numeric — the tax model
  // has no closed form)
  let cap0 = capital;
  let w = amount;
  let unreachable = false;
  if (solve === 1) {
    let lo = 0;
    let hi = deplete ? capital * (1 + j) : capital * j + allow;
    for (let k = 0; k < 60; k++) {
      const mid = (lo + hi) / 2;
      const lasts = deplete
        ? (() => {
            const s = sim(capital, mid, Math.round(n / p) + 1);
            return s.zeroAt === null || s.zeroAt >= n;
          })()
        : sustainable(capital, mid);
      if (lasts) lo = mid;
      else hi = mid;
    }
    w = lo;
  } else if (solve === 0) {
    if (!deplete && j <= 0) {
      unreachable = true;
      cap0 = 0;
    } else if (deplete) {
      let lo = 0;
      let hi = w * n;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        const s = sim(mid, w, Math.round(n / p) + 1);
        if (s.zeroAt === null || s.zeroAt >= n) hi = mid;
        else lo = mid;
      }
      cap0 = hi;
    } else {
      let hi = w / (j * (1 - trate)) + w;
      let guard = 0;
      while (!sustainable(hi, w) && guard++ < 40) hi *= 2;
      let lo = 0;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (sustainable(mid, w)) hi = mid;
        else lo = mid;
      }
      cap0 = hi;
    }
  }

  const forever = !unreachable && sustainable(cap0, w);
  const probe = sim(cap0, w, 100);
  const periodsLast = forever ? null : probe.zeroAt;

  const horizonYears = Math.min(
    60,
    periodsLast === null
      ? 30
      : Math.max(5, Math.ceil(periodsLast / p) + 2),
  );
  const final = sim(cap0, w, horizonYears);
  const remaining = final.yearly.slice(0, horizonYears + 1);

  const rows: [string, string][] = [];
  if (solve === 0)
    rows.push([
      ui.neededCapital,
      unreachable ? "—" : fmt.euro.format(cap0),
    ]);
  if (solve === 1)
    rows.push([
      ui.withdrawAmount,
      `${fmt.euro.format(w)} ${ui.perInterval[intervalIdx]}`,
    ]);
  const lastsMonths =
    periodsLast === null ? null : Math.ceil((periodsLast * 12) / p);
  rows.push([
    ui.capitalLasts,
    forever
      ? ui.forever
      : lastsMonths === null
        ? `> 100 ${ui.yearsWord}`
        : ui.durationFmt(Math.floor(lastsMonths / 12), lastsMonths % 12),
  ]);
  if (trate > 0 && !unreachable)
    rows.push([ui.taxesLabel, `−${fmt.euro.format(final.taxes)}`]);

  return (
    <>
      <div className="fin-card">
        <SelectField
          label={ui.calcTypeLabel}
          value={solve}
          onChange={setSolve}
          options={ui.withdrawSolveOptions}
          info={ui.infoWithdrawSolve}
        />
        <div className="fin-grid">
          {solve !== 0 && (
            <Field label={ui.startingAmount} value={capital} onChange={setCapital} step={10000} suffix="€" info={ui.infoStarting} />
          )}
          {solve !== 1 && (
            <Field label={ui.withdrawAmount} value={amount} onChange={setAmount} step={100} suffix="€" info={ui.infoWithdrawAmount} />
          )}
          <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.1} suffix="%" info={ui.infoReturn} />
          {solve !== 2 && deplete && (
            <Field label={ui.withdrawPeriod} value={duration} onChange={setDuration} info={ui.infoWithdrawPeriod} />
          )}
        </div>
        <SelectField
          label={ui.withdrawInterval}
          value={intervalIdx}
          onChange={setIntervalIdx}
          options={ui.withdrawIntervalOptions}
          info={ui.infoWithdrawInterval}
        />
        <SelectField
          label={ui.taxRateLabel}
          value={taxIdx}
          onChange={setTaxIdx}
          options={ui.taxOptions}
          info={ui.infoTax}
        />
        {preset === null && (
          <div className="fin-grid">
            <Field label={ui.taxRateLabel} value={customRate} onChange={setCustomRate} step={0.1} suffix="%" />
          </div>
        )}
        {trate > 0 && (
          <div className="fin-grid">
            <Field label={ui.allowanceLabel} value={allowance} onChange={setAllowance} step={100} suffix="€" info={ui.infoAllowance} />
          </div>
        )}
        {solve !== 2 && (
          <Toggle
            label={ui.capitalDepletion}
            checked={deplete}
            onChange={setDeplete}
            info={ui.infoDepletion}
          />
        )}
      </div>
      <Chart
        series={[{ label: ui.capitalLabel, color: C1, values: remaining }]}
        tipFmt={(v) => fmt.euro.format(v)}
      />
      <Results rows={rows} />
      <Faq ui={ui} items={ui.faqWithdrawal} />
    </>
  );
}

/** Effective tax presets: [none, 8 % church, 9 % church] German rates. */
const DE_RATES = [26.375, 27.819, 27.99];

function Freedom({ ui }: { ui: UIStrings }) {
  const fmt = useFmt();
  const [netIncome, setNetIncome] = useState(1500);
  const [ageNow, setAgeNow] = useState(35);
  const [ageFree, setAgeFree] = useState(60);
  const [assets, setAssets] = useState(25000);
  const [rate, setRate] = useState(7);
  const [deplete, setDeplete] = useState(false);
  const [withdrawal, setWithdrawal] = useState(4);
  const [depletionYears, setDepletionYears] = useState(30);
  const [inflOn, setInflOn] = useState(true);
  const [infl, setInfl] = useState(2);
  const [country, setCountry] = useState(0);
  const [etf, setEtf] = useState(true);
  const [church, setChurch] = useState(0);
  const [customTax, setCustomTax] = useState(26.375);

  // effective tax rate on gains, parqet-style
  let effRate: number;
  if (country === 0) effRate = DE_RATES[church] * (etf ? 0.7 : 1);
  else if (country === 1) effRate = 27.5;
  else if (country === 2) effRate = 0;
  else effRate = customTax;

  const years = Math.max(0, Math.round(ageFree) - Math.round(ageNow));
  const f = inflOn ? infl / 100 : 0;
  const incomeAtFreedom = netIncome * (1 + f) ** years;
  const grossYear = (incomeAtFreedom * 12) / (1 - effRate / 100);

  // needed capital at freedom
  const r = rate / 100;
  let needed: number;
  if (!deplete) {
    needed = withdrawal > 0 ? grossYear / (withdrawal / 100) : 0;
  } else {
    const rr = (1 + r) / (1 + f) - 1; // real return keeps purchasing power
    const D = Math.max(1, Math.round(depletionYears));
    needed =
      Math.abs(rr) > 1e-9
        ? (grossYear * (1 - (1 + rr) ** -D)) / rr
        : grossYear * D;
  }

  // required monthly savings to close the gap
  const i = r / 12;
  const nMonths = years * 12;
  const fvAssets = assets * (1 + i) ** nMonths;
  const gap = needed - fvAssets;
  const savings =
    nMonths === 0 || gap <= 0
      ? 0
      : i > 0
        ? (gap * i) / ((1 + i) ** nMonths - 1)
        : gap / nMonths;

  // chart: accumulation until freedom, then withdrawal phase
  const postYears = deplete ? Math.max(1, Math.round(depletionYears)) : 15;
  const chartYears = Math.min(70, years + postYears);
  const capitalSeries: number[] = [assets];
  let cap = assets;
  let g = (incomeAtFreedom * 12) / (1 - effRate / 100) / 12; // monthly gross
  for (let m = 1; m <= chartYears * 12; m++) {
    if (m <= nMonths) {
      cap = cap * (1 + i) + savings;
    } else {
      cap = Math.max(0, cap * (1 + i) - g);
      g *= 1 + f / 12;
    }
    if (m % 12 === 0) capitalSeries.push(cap);
  }

  const rows: [string, string][] = [
    [ui.effectiveTax, `${fmt.num.format(effRate)} %`],
    [ui.grossPerYear, fmt.euro.format(grossYear)],
    [ui.neededCapital, fmt.euro.format(needed)],
    [
      ui.savingsNeeded,
      savings === 0 && gap <= 0
        ? ui.alreadyReached
        : fmt.euro.format(savings),
    ],
  ];

  return (
    <>
      <div className="fin-card">
        <div className="fin-grid">
          <Field label={ui.desiredNetIncome} value={netIncome} onChange={setNetIncome} step={100} suffix="€" info={ui.infoNetIncome} />
          <Field label={ui.existingAssets} value={assets} onChange={setAssets} step={1000} suffix="€" info={ui.infoAssets} />
          <Field label={ui.ageNow} value={ageNow} onChange={setAgeNow} />
          <Field label={ui.ageFree} value={ageFree} onChange={setAgeFree} />
          <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.5} suffix="%" info={ui.infoFreedomReturn} />
          {inflOn && (
            <Field label={ui.inflationRate} value={infl} onChange={setInfl} step={0.1} suffix="%" info={ui.infoInflation} />
          )}
        </div>
        <p className="fin-note">
          {ui.perYearApprox(fmt.euro.format(netIncome * 12))} ·{" "}
          {ui.yearsToFreedom(years)}
        </p>
        <Toggle label={ui.inflationToggle} checked={inflOn} onChange={setInflOn} info={ui.infoInflation} />
        <Toggle label={ui.capitalDepletion} checked={deplete} onChange={setDeplete} info={ui.infoDepletion} />
        {deplete ? (
          <div className="fin-grid">
            <Field label={ui.withdrawPeriod} value={depletionYears} onChange={setDepletionYears} info={ui.infoWithdrawPeriod} />
          </div>
        ) : (
          <div className="fin-grid">
            <Field label={ui.withdrawalRate} value={withdrawal} onChange={setWithdrawal} step={0.5} suffix="%" info={ui.infoWithdrawal} />
          </div>
        )}
        <SelectField
          label={ui.countryTaxLabel}
          value={country}
          onChange={setCountry}
          options={ui.countryTaxOptions}
          info={ui.infoTax}
        />
        {country === 0 && (
          <>
            <Toggle label={ui.etfRelief} checked={etf} onChange={setEtf} />
            <SelectField
              label={ui.churchTaxLabel}
              value={church}
              onChange={setChurch}
              options={ui.churchTaxOptions}
            />
          </>
        )}
        {country === 3 && (
          <div className="fin-grid">
            <Field label={ui.taxRateLabel} value={customTax} onChange={setCustomTax} step={0.1} suffix="%" />
          </div>
        )}
      </div>
      <Chart
        series={[{ label: ui.capitalLabel, color: C2, values: capitalSeries }]}
        target={{ value: needed, label: ui.targetLabel }}
        tipFmt={(v) => fmt.euro.format(v)}
      />
      <Results rows={rows} />
      <Faq ui={ui} items={ui.faqFreedom} />
    </>
  );
}

export function Finance() {
  const ui = useUI();
  const [tab, setTab] = useState(0);
  const tabs: [string, ReactNode][] = [
    [ui.financeTabs[0], <Savings key="s" ui={ui} />],
    [ui.financeTabs[1], <Loan key="l" ui={ui} />],
    [ui.financeTabs[2], <Withdrawal key="w" ui={ui} />],
    [ui.financeTabs[3], <Freedom key="f" ui={ui} />],
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
