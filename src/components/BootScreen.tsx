import { AvatarLogo } from "../icons";

export function BootScreen({ done }: { done: boolean }) {
  return (
    <div className={`boot ${done ? "boot-done" : ""}`} aria-hidden={done}>
      <AvatarLogo size={84} />
      <div className="boot-name">MarcoMontesines</div>
      <div className="boot-bar">
        <div className="boot-bar-fill" />
      </div>
    </div>
  );
}
