import { AppTile } from "../icons";
import { APPS, type AppId } from "../os/apps";

interface LaunchpadProps {
  onLaunch: (id: AppId) => void;
  onClose: () => void;
}

export function Launchpad({ onLaunch, onClose }: LaunchpadProps) {
  return (
    <div className="launchpad" onClick={onClose}>
      <div className="launchpad-grid" onClick={(e) => e.stopPropagation()}>
        {APPS.filter((app) => !app.hidden).map((app) => (
          <button
            key={app.id}
            className="launchpad-item"
            onClick={() => {
              onLaunch(app.id);
              onClose();
            }}
          >
            <AppTile id={app.id} size={72} />
            {app.title}
          </button>
        ))}
      </div>
    </div>
  );
}
