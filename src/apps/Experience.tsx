import {
  achievements,
  award,
  education,
  experience,
  recognition,
} from "../content";

export function Experience() {
  return (
    <div className="app-pad">
      <h2 className="section-head">Professional Experience</h2>
      <ol className="timeline">
        {experience.map((s) => (
          <li key={s.period + s.org} className="timeline-item">
            <span className="timeline-period">{s.period}</span>
            <div className="timeline-body">
              <strong>{s.role}</strong> · {s.org}
              <p>{s.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="section-head">Key Achievements</h2>
      {achievements.map((a) => (
        <div key={a.title} className="ach-card">
          <strong>{a.title}</strong>
          <p>{a.note}</p>
        </div>
      ))}

      <h2 className="section-head">Education</h2>
      <ol className="timeline">
        {education.map((e) => (
          <li key={e.period} className="timeline-item">
            <span className="timeline-period">{e.period}</span>
            <div className="timeline-body">
              <strong>{e.degree}</strong> · {e.school}
              {e.focus && <p>Focus: {e.focus}</p>}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="section-head">Recognition</h2>
      {recognition.map((r) => (
        <div key={r.title} className="ach-card">
          <strong>{r.title}</strong>
          <p>{r.note}</p>
        </div>
      ))}
      <div className="ach-card ach-award">
        <strong>
          {award.title} · {award.org}
        </strong>
        <p>{award.note}</p>
      </div>
    </div>
  );
}
