import { useCallback, useRef, useState } from "react";
import { appMeta, type AppId } from "./apps";

export interface OSWindow {
  appId: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export interface WindowManager {
  windows: OSWindow[];
  activeApp: AppId | null;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  resize: (id: AppId, w: number, h: number) => void;
}

export function useWindowManager(): WindowManager {
  const [windows, setWindows] = useState<OSWindow[]>([]);
  const zRef = useRef(1);
  const nextZ = () => ++zRef.current;

  const open = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows((ws) => {
      const existing = ws.find((w) => w.appId === id);
      if (existing) {
        return ws.map((w) =>
          w.appId === id ? { ...w, minimized: false, z } : w,
        );
      }
      const meta = appMeta(id);
      // Size relative to the viewport (never below the app's minimum, never
      // beyond the screen), then open centered in the desktop area between
      // menu bar and dock, cascading later windows slightly.
      const vw = window.innerWidth;
      const availH = window.innerHeight - 130;
      const w = Math.min(Math.max(meta.w, Math.round(vw * meta.wf)), vw - 24);
      const h = Math.min(
        Math.max(meta.h, Math.round(availH * meta.hf)),
        availH - 12,
      );
      // Phones get no floating-window ergonomics — open full-screen there.
      const maximized = vw < 700;
      const cascade = (ws.length % 4) * 26;
      const x = Math.max(
        8,
        Math.min(Math.round((vw - w) / 2) + cascade - 26, vw - w - 8),
      );
      const y = Math.max(
        6,
        Math.min(Math.round((availH - h) / 2) + cascade - 20, availH - h),
      );
      return [
        ...ws,
        {
          appId: id,
          x,
          y,
          w,
          h,
          z,
          minimized: false,
          maximized,
        },
      ];
    });
  }, []);

  const close = useCallback((id: AppId) => {
    setWindows((ws) => ws.filter((w) => w.appId !== id));
  }, []);

  const focus = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows((ws) =>
      ws.map((w) => (w.appId === id ? { ...w, minimized: false, z } : w)),
    );
  }, []);

  const minimize = useCallback((id: AppId) => {
    setWindows((ws) =>
      ws.map((w) => (w.appId === id ? { ...w, minimized: true } : w)),
    );
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows((ws) =>
      ws.map((w) =>
        w.appId === id ? { ...w, maximized: !w.maximized, z } : w,
      ),
    );
  }, []);

  const move = useCallback((id: AppId, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.appId === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id: AppId, w: number, h: number) => {
    setWindows((ws) =>
      ws.map((win) => (win.appId === id ? { ...win, w, h } : win)),
    );
  }, []);

  const visible = windows.filter((w) => !w.minimized);
  const activeApp =
    visible.length > 0
      ? visible.reduce((a, b) => (a.z > b.z ? a : b)).appId
      : null;

  return {
    windows,
    activeApp,
    open,
    close,
    focus,
    minimize,
    toggleMaximize,
    move,
    resize,
  };
}
