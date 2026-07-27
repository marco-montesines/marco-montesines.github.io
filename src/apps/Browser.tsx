import { useRef, useState, type KeyboardEvent } from "react";

const HOME = "https://www.google.com/webhp?igu=1";
const HOME_SHOWN = "https://www.google.com";

export function Browser() {
  const frame = useRef<HTMLIFrameElement | null>(null);
  const [src, setSrc] = useState(
    () => localStorage.getItem("browser-url") ?? HOME,
  );
  const [shown, setShown] = useState(
    () => localStorage.getItem("browser-shown-url") ?? HOME_SHOWN,
  );

  const visit = (nextSrc: string, nextShown: string) => {
    setSrc(nextSrc);
    setShown(nextShown);
    localStorage.setItem("browser-url", nextSrc);
    localStorage.setItem("browser-shown-url", nextShown);
  };

  const go = (raw: string) => {
    let url = raw.trim();
    if (!url) return;
    if (!/^https?:\/\//.test(url)) url = `https://${url}`;
    url = encodeURI(url);
    // google.com refuses to be framed except through the webhp?igu=1 endpoint
    if (url.includes("google.com")) visit(HOME, HOME_SHOWN);
    else visit(url, url);
  };

  const reload = () => {
    if (frame.current) frame.current.src += "";
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      go(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="browser">
      <div className="browser-bar">
        <button
          className="browser-btn"
          title="Reload"
          aria-label="Reload page"
          onClick={reload}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13 8 A5 5 0 1 1 11.6 4.4" fill="none" />
            <path d="M11.6 1.6 L11.6 4.4 L8.8 4.4" fill="none" />
          </svg>
        </button>
        <button
          className="browser-btn"
          title="Home"
          aria-label="Go to home page"
          onClick={() => visit(HOME, HOME_SHOWN)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2.5 8 L8 3 L13.5 8" fill="none" />
            <path d="M4.5 7.2 V13 H11.5 V7.2" fill="none" />
          </svg>
        </button>
        <input
          className="browser-url"
          value={shown}
          spellCheck={false}
          autoComplete="off"
          type="url"
          aria-label="Address"
          onChange={(e) => setShown(e.target.value)}
          onKeyDown={onKey}
        />
      </div>
      <iframe ref={frame} className="app-frame" src={src} title="Browser" />
    </div>
  );
}