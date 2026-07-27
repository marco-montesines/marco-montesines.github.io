import { useContent, useUI } from "../i18n";

export function Skills() {
  const { bio, competencies, skills } = useContent();
  const ui = useUI();
  return (
    <div className="app-pad">
      <h2 className="section-head">{ui.coreCompetencies}</h2>
      {competencies.map((c) => (
        <div key={c.name} className="comp">
          <span className="comp-label">
            {c.name}
            <span className="comp-pct">{c.pct}%</span>
          </span>
          <span className="comp-track">
            <span className="comp-fill" style={{ width: `${c.pct}%` }} />
          </span>
        </div>
      ))}

      <h2 className="section-head">{ui.techStack}</h2>
      {Object.entries(skills).map(([group, items]) => (
        <section key={group} className="skill-group">
          <h2>{group}</h2>
          <ul className="tags">
            {items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2 className="section-head">{ui.languages}</h2>
      <p className="lang-line">{bio.languages}</p>
    </div>
  );
}
