import { useRef, type PointerEvent, type ReactNode } from "react";
import { appMeta } from "../os/apps";
import type { OSWindow } from "../os/windowing";

interface WindowProps {
  win: OSWindow;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: ReactNode;
}

const MIN_W = 300;
const MIN_H = 200;

export function Window({
  win,
  active,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
  children,
}: WindowProps) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const sizing = useRef<{ dw: number; dh: number } | null>(null);

  const onResizePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (win.maximized) return;
    sizing.current = { dw: e.clientX - win.w, dh: e.clientY - win.h };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const onResizePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!sizing.current) return;
    onResize(
      Math.min(
        Math.max(MIN_W, e.clientX - sizing.current.dw),
        window.innerWidth - win.x - 6,
      ),
      Math.min(
        Math.max(MIN_H, e.clientY - sizing.current.dh),
        window.innerHeight - win.y - 36,
      ),
    );
  };

  const onResizePointerUp = () => {
    sizing.current = null;
  };

  const onTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (win.maximized || (e.target as HTMLElement).closest("button")) return;
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    // Windows may hang off the sides and bottom (they
    // slide behind the dock), but the title bar can never leave reach —
    // not above the menu bar, not fully off any edge.
    const x = Math.min(
      Math.max(-win.w + 90, e.clientX - drag.current.dx),
      window.innerWidth - 90,
    );
    const y = Math.min(
      Math.max(0, e.clientY - drag.current.dy),
      window.innerHeight - 72,
    );
    onMove(x, y);
  };

  const onTitlePointerUp = () => {
    drag.current = null;
  };

  const meta = appMeta(win.appId);
  const style = win.maximized
    ? { inset: 0, width: "auto", height: "auto", zIndex: win.z }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      };

  return (
    <section
      className={`window ${active ? "window-active" : ""} ${win.maximized ? "window-max" : ""}`}
      style={style}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={meta.title}
    >
      <div
        className="window-title"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={onToggleMaximize}
      >
        <span className="window-controls">
          <button
            className="wc wc-close"
            title="Close"
            aria-label={`Close ${meta.title}`}
            onClick={onClose}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4" />
            </svg>
          </button>
          <button
            className="wc wc-min"
            title="Minimize"
            aria-label={`Minimize ${meta.title}`}
            onClick={onMinimize}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 6 L9 6" />
            </svg>
          </button>
          <button
            className="wc wc-max"
            title={win.maximized ? "Restore" : "Maximize"}
            aria-label={`${win.maximized ? "Restore" : "Maximize"} ${meta.title}`}
            onClick={onToggleMaximize}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3.2 6.8 L3.2 3.2 L6.8 3.2 Z" fill="currentColor" stroke="none" />
              <path d="M8.8 5.2 L8.8 8.8 L5.2 8.8 Z" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </span>
        <span className="window-name">{meta.title}</span>
      </div>
      <div className="window-body">{children}</div>
      {!win.maximized && (
        <div
          className="window-resize"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
        />
      )}
    </section>
  );
}
