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

export function VSCode() {
  const [view, setView] = useState<"editor" | "quick">("editor");
  const [selected, setSelected] = useState(0);
  const file = FILES[selected];
  return (
    <div className="vscode">
      <div className="vscode-top">
        <button
          className={`vscode-tab ${view === "editor" ? "vscode-tab-sel" : ""}`}
          onClick={() => setView("editor")}
        >
          Repo editor
        </button>
        <button
          className={`vscode-tab ${view === "quick" ? "vscode-tab-sel" : ""}`}
          onClick={() => setView("quick")}
        >
          Quick view
        </button>
        <span className="vscode-hint">
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
          className="vscode-frame"
          src={REPO_EDITOR_URL}
          title="Repository in a web editor"
        />
      ) : (
        <div className="vscode-main">
          <aside className="vscode-side">
            {FILES.map((f, i) => (
              <button
                key={f.name}
                className={`vscode-file ${i === selected ? "vscode-file-sel" : ""}`}
                onClick={() => setSelected(i)}
              >
                {f.name}
                <span>{f.note}</span>
              </button>
            ))}
          </aside>
          <pre className="vscode-code">
            <code>{file.source}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
