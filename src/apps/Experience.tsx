import { useContent, useUI } from "../i18n";

export function Experience() {
  const { achievements, award, education, experience, recognition, training } =
    useContent();
  const ui = useUI();
  return (
    <div className="app-pad">
      <h2 className="section-head">{ui.professionalExperience}</h2>
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

      <h2 className="section-head">{ui.keyAchievements}</h2>
      {achievements.map((a) => (
        <div key={a.title} className="ach-card">
          <strong>{a.title}</strong>
          <p>{a.note}</p>
        </div>
      ))}

      <h2 className="section-head">{ui.education}</h2>
      <ol className="timeline">
        {education.map((e) => (
          <li key={e.period} className="timeline-item">
            <span className="timeline-period">{e.period}</span>
            <div className="timeline-body">
              <strong>{e.degree}</strong> · {e.school}
              {e.focus && (
                <p>
                  {ui.focusLabel}: {e.focus}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="section-head">{ui.furtherTraining}</h2>
      <ol className="timeline">
        {training.map((e) => (
          <li key={e.period} className="timeline-item">
            <span className="timeline-period">{e.period}</span>
            <div className="timeline-body">
              <strong>{e.degree}</strong> · {e.school}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="section-head">{ui.recognition}</h2>
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
