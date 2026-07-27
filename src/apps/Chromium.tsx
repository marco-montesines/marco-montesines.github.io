import { useEffect, useRef, useState } from "react";
import { bio } from "../content";
import { useUI } from "../i18n";
import { consumePendingUrl, onBrowserNavigate } from "../os/browserBus";

/** Hosts that send X-Frame-Options / frame-ancestors and stay blank. */
const FRAME_BLOCKED = [
  "github.com",
  "linkedin.com",
  "gitlab.com",
  "pkg.go.dev",
];

const blockedHost = (url: string): string | null => {
  try {
    const host = new URL(url).hostname;
    return FRAME_BLOCKED.some((b) => host === b || host.endsWith(`.${b}`))
      ? host
      : null;
  } catch {
    return null;
  }
};

interface Bookmark {
  label: string;
  href: string;
  /** Sites known to forbid framing (GitHub, LinkedIn…) open in a new tab. */
  external?: boolean;
}

const BOOKMARKS: Bookmark[] = [
  {
    label: "haveibeenpwned docs",
    href: "https://marco-montesines.github.io/haveibeenpwned/",
  },
  ...bio.links.map((l) => ({ label: l.label, href: l.href, external: true })),
];

const START = "chromium://start";

export function Chromium() {
  const ui = useUI();
  const [history, setHistory] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [frameKey, setFrameKey] = useState(0);
  const url = history[history.length - 1] ?? null;

  const visit = (target: string) => {
    setHistory((h) => [...h, target]);
    setTyped(target);
  };

  // URLs handed over from other apps (e.g. a project card).
  const visitRef = useRef(visit);
  visitRef.current = visit;
  useEffect(() => {
    const check = () => {
      const p = consumePendingUrl();
      if (p) visitRef.current(p);
    };
    check();
    return onBrowserNavigate(check);
  }, []);

  const back = () => {
    setHistory((h) => h.slice(0, -1));
    setTyped(history[history.length - 2] ?? "");
  };

  const go = () => {
    const q = typed.trim();
    if (!q || q === START || q === url) return;
    // URLs load in-window; anything else becomes a Bing search, which —
    // unlike most engines — allows being embedded.
    const target = /^https?:\/\//.test(q)
      ? q
      : /\.[a-z]{2,}($|\/)/i.test(q)
        ? `https://${q}`
        : `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
    visit(target);
  };

  return (
    <div className="chromium">
      <div className="chromium-toolbar">
        <button
          className="chromium-nav"
          aria-label="Back"
          disabled={!url}
          onClick={back}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M10.5 2.5 L4.5 8 L10.5 13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <button
          className="chromium-nav"
          aria-label="Reload"
          onClick={() => setFrameKey((k) => k + 1)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M13.5 8 A5.5 5.5 0 1 1 11.6 3.9 M11.5 1 L11.8 4.2 L8.6 4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
        <div className="chromium-address">
          <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
            <rect
              x="3.5"
              y="7"
              width="9"
              height="6.5"
              rx="1.5"
              fill="currentColor"
            />
            <path
              d="M5.5 7 V5 A2.5 2.5 0 0 1 10.5 5 V7"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
          <input
            value={typed}
            placeholder={START}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") go();
            }}
            aria-label="Search or address"
          />
        </div>
        <button
          className="chromium-nav"
          aria-label="Open current page in a new tab"
          disabled={!url}
          onClick={() => url && window.open(url, "_blank", "noopener")}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
            <g
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              fill="none"
            >
              <path d="M6.5 3 H3 V13 H13 V9.5" />
              <path d="M9.5 2.5 H13.5 V6.5 M13.5 2.5 L8 8" />
            </g>
          </svg>
        </button>
      </div>
      {url && blockedHost(url) ? (
        <div className="chromium-start">
          <h1>{blockedHost(url)}</h1>
          <p className="chromium-tag">{ui.blockedNote(blockedHost(url)!)}</p>
          <button
            className="chromium-open"
            onClick={() => window.open(url, "_blank", "noopener")}
          >
            {ui.openNewTab}
          </button>
        </div>
      ) : url ? (
        <iframe
          key={`${frameKey}-${url}`}
          className="chromium-frame"
          src={url}
          title="Chromium browser content"
        />
      ) : (
        <div className="chromium-start">
          <h1>Chromium</h1>
          <p className="chromium-tag">
            Type an address or search above — some sites
            forbid embedding and stay blank; use the open-in-new-tab button
            then. Favorites:
          </p>
          <div className="chromium-grid">
            {BOOKMARKS.map((b) => (
              <button
                key={b.href}
                className="chromium-card"
                onClick={() =>
                  b.external
                    ? window.open(b.href, "_blank", "noopener")
                    : visit(b.href)
                }
              >
                <span className="chromium-fav">{b.label[0].toUpperCase()}</span>
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
