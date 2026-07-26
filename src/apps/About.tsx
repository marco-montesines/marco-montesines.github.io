import { bio, recommendations } from "../content";

export function About() {
  return (
    <div className="app-pad">
      <h1 className="about-name">{bio.name}</h1>
      <p className="about-role">
        {bio.role} — {bio.tagline}
      </p>
      <p>{bio.about}</p>
      <p className="about-links">
        {bio.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        ))}
      </p>
      <h2 className="section-head">Recommendations</h2>
      {recommendations.map((r) => (
        <blockquote key={r.who} className="quote">
          “{r.quote}”<footer>{r.who}</footer>
        </blockquote>
      ))}
    </div>
  );
}
