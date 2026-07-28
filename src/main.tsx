import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// iOS Safari restores the page's scroll offset on reload, which can shove
// the menu bar under the top edge — this shell never scrolls, so never
// restore.
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// dvh units are stale on iOS (they only refresh on page scrolls, and this
// page never scrolls). Size the shell from the visualViewport instead —
// the one API that always reports the truly visible area — and keep the
// page anchored at the top whenever the viewport shifts.
const vv = window.visualViewport;
if (vv) {
  const apply = () => {
    // The on-screen keyboard also shrinks the visualViewport — but it is
    // an overlay, not a layout change: keep the shell stable and let iOS
    // pan to the focused input. Only track toolbar/rotation changes.
    const keyboardOpen = vv.height < window.innerHeight * 0.8;
    if (keyboardOpen) return;
    document.documentElement.style.setProperty("--vvh", `${vv.height}px`);
    window.scrollTo(0, 0);
  };
  apply();
  vv.addEventListener("resize", apply);
  vv.addEventListener("scroll", apply);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
