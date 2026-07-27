import { useEffect, useRef, useState } from "react";
import { bio } from "../content";
import { useUI } from "../i18n";
import { AvatarLogo } from "../icons";

type CamState = "idle" | "active" | "denied";

export function Harapan({ autoStart = false }: { autoStart?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CamState>("idle");
  const autoStartRef = useRef(autoStart);
  const ui = useUI();

  const start = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setState("active");
    } catch {
      setState("denied");
    }
  };

  // The <video> only mounts once state flips to active — attach then.
  useEffect(() => {
    if (state === "active" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [state]);

  // Opened by accepting the incoming call: go straight to the camera.
  useEffect(() => {
    if (autoStartRef.current) void start();
  }, []);

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  return (
    <div className="harapan">
      {state === "active" ? (
        <video ref={videoRef} autoPlay muted playsInline />
      ) : (
        <div className="harapan-idle">
          <p>
            <strong>Harapan</strong>
          </p>
          {state === "denied" ? (
            <div className="harapan-card">
              <AvatarLogo size={72} />
              <p className="harapan-note">{ui.cameraOffline}</p>
              <div className="harapan-links">
                {bio.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="harapan-note">{ui.cameraIdle}</p>
              <button className="harapan-btn" onClick={() => void start()}>
                {ui.cameraOn}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
