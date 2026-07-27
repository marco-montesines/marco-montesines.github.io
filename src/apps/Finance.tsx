import { useMemo, useState, type ReactNode } from "react";
import { intlLocale, useLocale, useUI, type UIStrings } from "../i18n";

const useEuro = () => {
  const locale = useLocale();
  return useMemo(
    () =>
      new Intl.NumberFormat(intlLocale(locale), {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
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

function Savings({ ui }: { ui: UIStrings }) {
  const euro = useEuro();
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
      <Field label={ui.startingAmount} value={initial} onChange={setInitial} step={500} suffix="€" />
      <Field label={ui.monthlyContribution} value={monthly} onChange={setMonthly} step={50} suffix="€" />
      <Field label={ui.annualReturn} value={rate} onChange={setRate} step={0.1} suffix="%" />
      <Field label={ui.years} value={years} onChange={setYears} />
      <Results
        rows={[
          [ui.futureValue, euro.format(future)],
          [ui.totalInvested, euro.format(invested)],
          [ui.growthEarned, euro.format(future - invested)],
        ]}
      />
    </>
  );
}

function Loan({ ui }: { ui: UIStrings }) {
  const euro = useEuro();
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
      <Field label={ui.loanAmount} value={principal} onChange={setPrincipal} step={5000} suffix="€" />
      <Field label={ui.annualInterest} value={rate} onChange={setRate} step={0.1} suffix="%" />
      <Field label={ui.years} value={years} onChange={setYears} />
      <Results
        rows={[
          [ui.monthlyPayment, euro.format(monthly)],
          [ui.totalPaid, euro.format(total)],
          [ui.totalInterest, euro.format(total - principal)],
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
