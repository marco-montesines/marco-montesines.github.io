import { useUI } from "../i18n";
import { AppTile } from "../icons";

interface CallBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CallBanner({ onAccept, onDecline }: CallBannerProps) {
  const ui = useUI();
  return (
    <div className="call-banner" role="alert">
      <AppTile id="harapan" size={40} />
      <div className="call-info">
        <strong>{ui.caller}</strong>
        <span>{ui.callKind}</span>
        <div className="call-actions">
          <button className="call-decline" onClick={onDecline}>
            {ui.decline}
          </button>
          <button className="call-accept" onClick={onAccept}>
            {ui.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
