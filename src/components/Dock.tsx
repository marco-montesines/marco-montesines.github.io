import { useRef } from "react";
import { AppTile, GitHubMarkIcon, LaunchpadIcon } from "../icons";
import { openInBrowser } from "../os/browserBus";
import { APPS, type AppId } from "../os/apps";
import type { OSWindow } from "../os/windowing";

interface DockProps {
  windows: OSWindow[];
  activeApp: AppId | null;
  onLaunch: (id: AppId) => void;
  onLaunchpad: () => void;
}

/** Magnification physics: influence radius, max extra scale, max rise. */
const RADIUS = 110;
const GROWTH = 0.42;
const LIFT = 14;

export function Dock({ windows, activeApp, onLaunch, onLaunchpad }: DockProps) {
  const barRef = useRef<HTMLElement>(null);
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Uses offsetLeft (layout position, unaffected by the transforms we set)
  // instead of live rects, so magnifying neighbors can't feed back into
  // the distance math and wobble.
  const magnify = (clientX: number) => {
    const bar = barRef.current;
    if (!bar || reduced.current) return;
    const x = clientX - bar.getBoundingClientRect().left;
    bar.querySelectorAll<HTMLElement>(".dock-item").forEach((el) => {
      const d = Math.abs(x - (el.offsetLeft + el.offsetWidth / 2));
      if (d >= RADIUS) {
        el.style.transform = "";
        return;
      }
      const f = Math.cos((d / RADIUS) * (Math.PI / 2));
      const boost = f * f;
      el.style.transform = `translateY(${-LIFT * boost}px) scale(${1 + GROWTH * boost})`;
    });
  };

  const reset = () => {
    barRef.current
      ?.querySelectorAll<HTMLElement>(".dock-item")
      .forEach((el) => {
        el.style.transform = "";
      });
  };

  return (
    <nav
      className="dock"
      aria-label="Applications"
      ref={barRef}
      onMouseMove={(e) => magnify(e.clientX)}
      onMouseLeave={reset}
    >
      <button
        className="dock-item"
        data-title="Launchpad"
        aria-label="Launchpad"
        onClick={onLaunchpad}
      >
        <span className="tile tile-launchpad">
          <LaunchpadIcon size={24} />
        </span>
        <span className="dock-dot" />
      </button>
      <span className="dock-sep" />
      {APPS.filter((app) => !app.hidden).map((app) => {
        const win = windows.find((w) => w.appId === app.id);
        return (
          <button
            key={app.id}
            className={`dock-item ${activeApp === app.id ? "dock-item-active" : ""}`}
            data-title={app.title}
            aria-label={app.title}
            onClick={() => onLaunch(app.id)}
          >
            <AppTile id={app.id} />
            <span className={`dock-dot ${win ? "dock-dot-on" : ""}`} />
          </button>
        );
      })}
      <span className="dock-sep" />
      <a
        className="dock-item"
        data-title="GitHub"
        aria-label="GitHub"
        href="https://github.com/marco-montesines"
        onClick={(e) => {
          e.preventDefault();
          openInBrowser("https://github.com/marco-montesines");
        }}
      >
        <span className="tile tile-github">
          <GitHubMarkIcon />
        </span>
        <span className="dock-dot" />
      </a>
    </nav>
  );
}
