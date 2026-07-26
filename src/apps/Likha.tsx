import { useState } from "react";
import appSource from "../App.tsx?raw";
import contentSource from "../content.ts?raw";
import windowingSource from "../os/windowing.ts?raw";

const REPO_EDITOR_URL =
  "https://github1s.com/marco-montesines/marco-montesines.github.io/blob/main/src/content.ts";

const FILES = [
  { name: "content.ts", note: "the resume as data", source: contentSource },
  { name: "App.tsx", note: "the OS shell", source: appSource },
  { name: "windowing.ts", note: "window manager", source: windowingSource },
];

export function Likha() {
  const [view, setView] = useState<"editor" | "quick">("editor");
  const [selected, setSelected] = useState(0);
  const file = FILES[selected];
  return (
    <div className="likha">
      <div className="likha-top">
        <button
          className={`likha-tab ${view === "editor" ? "likha-tab-sel" : ""}`}
          onClick={() => setView("editor")}
        >
          Repo editor
        </button>
        <button
          className={`likha-tab ${view === "quick" ? "likha-tab-sel" : ""}`}
          onClick={() => setView("quick")}
        >
          Quick view
        </button>
        <span className="likha-hint">
          this site's own source
          {view === "editor" && (
            <>
              {" · "}
              <a href={REPO_EDITOR_URL} target="_blank" rel="noreferrer">
                open in new tab
              </a>
            </>
          )}
        </span>
      </div>
      {view === "editor" ? (
        <iframe
          className="likha-frame"
          src={REPO_EDITOR_URL}
          title="Repository in a web editor"
        />
      ) : (
        <div className="likha-main">
          <aside className="likha-side">
            {FILES.map((f, i) => (
              <button
                key={f.name}
                className={`likha-file ${i === selected ? "likha-file-sel" : ""}`}
                onClick={() => setSelected(i)}
              >
                {f.name}
                <span>{f.note}</span>
              </button>
            ))}
          </aside>
          <pre className="likha-code">
            <code>{file.source}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
