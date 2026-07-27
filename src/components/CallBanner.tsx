import { AppTile } from "../icons";

interface CallBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CallBanner({ onAccept, onDecline }: CallBannerProps) {
  return (
    <div className="call-banner" role="alert">
      <AppTile id="harapan" size={40} />
      <div className="call-info">
        <strong>Recruiter</strong>
        <span>Harapan video call…</span>
        <div className="call-actions">
          <button className="call-decline" onClick={onDecline}>
            Decline
          </button>
          <button className="call-accept" onClick={onAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
