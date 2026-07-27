import { useState, type ReactNode } from "react";

const euro = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

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

function Savings() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(20);

  const i = rate / 100 / 12;
  const n = years * 12;
  const growth = (1 + i) ** n;
  const future =
    i === 0
      ? initial + monthly * n
      : initial * growth + monthly * ((growth - 1) / i);
  const invested = initial + monthly * n;

  return (
    <>
      <Field label="Starting amount" value={initial} onChange={setInitial} step={500} suffix="€" />
      <Field label="Monthly contribution" value={monthly} onChange={setMonthly} step={50} suffix="€" />
      <Field label="Annual return" value={rate} onChange={setRate} step={0.1} suffix="%" />
      <Field label="Years" value={years} onChange={setYears} />
      <Results
        rows={[
          ["Future value", euro.format(future)],
          ["Total invested", euro.format(invested)],
          ["Growth earned", euro.format(future - invested)],
        ]}
      />
    </>
  );
}

function Loan() {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(3.8);
  const [years, setYears] = useState(25);

  const i = rate / 100 / 12;
  const n = years * 12;
  const monthly =
    i === 0 ? principal / n : (principal * i) / (1 - (1 + i) ** -n);
  const total = monthly * n;

  return (
    <>
      <Field label="Loan amount" value={principal} onChange={setPrincipal} step={5000} suffix="€" />
      <Field label="Annual interest" value={rate} onChange={setRate} step={0.1} suffix="%" />
      <Field label="Years" value={years} onChange={setYears} />
      <Results
        rows={[
          ["Monthly payment", euro.format(monthly)],
          ["Total paid", euro.format(total)],
          ["Total interest", euro.format(total - principal)],
        ]}
      />
    </>
  );
}

const TABS: [string, () => ReactNode][] = [
  ["Savings", () => <Savings />],
  ["Loan", () => <Loan />],
];

export function Finance() {
  const [tab, setTab] = useState(0);
  return (
    <div className="finance app-pad">
      <div className="settings-row-group">
        {TABS.map(([name], idx) => (
          <button
            key={name}
            className={`settings-chip ${idx === tab ? "settings-chip-sel" : ""}`}
            onClick={() => setTab(idx)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="fin-body">{TABS[tab][1]()}</div>
      <p className="settings-hint">
        Quick estimates with monthly compounding — not financial advice.
      </p>
    </div>
  );
}
