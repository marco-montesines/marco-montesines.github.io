import { bio, competencies, skills } from "../content";

export function Skills() {
  return (
    <div className="app-pad">
      <h2 className="section-head">Core Competencies</h2>
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

      <h2 className="section-head">Technology Stack</h2>
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

      <h2 className="section-head">Languages</h2>
      <p className="lang-line">{bio.languages}</p>
    </div>
  );
}
