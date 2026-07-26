import { useEffect, useRef, useState } from "react";

type CamState = "idle" | "active" | "denied";

export function Harapan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CamState>("idle");

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setState("active");
    } catch {
      setState("denied");
    }
  };

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
            <strong>Harapan</strong> — Tagalog for “face-to-face.”
          </p>
          {state === "denied" ? (
            <p className="harapan-note">
              Camera access was declined — nothing to see here (literally).
            </p>
          ) : (
            <>
              <p className="harapan-note">
                Uses your camera as a mirror. The video never leaves your
                device — no recording, no uploading, just you.
              </p>
              <button className="harapan-btn" onClick={() => void start()}>
                Turn on camera
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
