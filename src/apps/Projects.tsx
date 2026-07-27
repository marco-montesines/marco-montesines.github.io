import { useContent } from "../i18n";

export function Projects() {
  const { projects } = useContent();
  return (
    <div className="app-pad">
      {projects.map((p) => (
        <a
          key={p.name}
          className="project-card"
          href={p.href}
          target="_blank"
          rel="noreferrer"
        >
          <strong>{p.name}</strong>
          <span>{p.note}</span>
        </a>
      ))}
    </div>
  );
}
