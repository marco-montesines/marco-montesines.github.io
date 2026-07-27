import { AppTile, GitHubMarkIcon, LaunchpadIcon } from "../icons";
import { APPS, type AppId } from "../os/apps";
import type { OSWindow } from "../os/windowing";

interface DockProps {
  windows: OSWindow[];
  activeApp: AppId | null;
  onLaunch: (id: AppId) => void;
  onLaunchpad: () => void;
}

export function Dock({ windows, activeApp, onLaunch, onLaunchpad }: DockProps) {
  return (
    <nav className="dock" aria-label="Applications">
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
        target="_blank"
        rel="noreferrer"
      >
        <span className="tile tile-github">
          <GitHubMarkIcon />
        </span>
        <span className="dock-dot" />
      </a>
    </nav>
  );
}
