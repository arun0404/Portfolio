import React, { useState, useEffect, useCallback, useRef } from "react";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

/**
 * Broadcast when the theme changes, so components that can't be styled with
 * plain CSS (e.g. Particle.js, which paints to a <canvas>) can react to it
 * without prop-drilling through every page that renders them.
 */
export const THEME_CHANGE_EVENT = "portfolio-theme-change";

const STORAGE_KEY = "portfolio-theme";

function getStoredTheme() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode, etc.) — theme just won't persist.
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getStoredTheme);

  // Apply the stored preference once on mount (default is dark — the site's
  // designed look — so first-time visitors see nothing change).
  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Throttled: applyTheme() does a localStorage write and a custom-event
  // broadcast on every call, so a burst of rapid clicks shouldn't queue up
  // one of each per click.
  //
  // applyTheme() is called here, outside the setState call, rather than
  // inside a setTheme(prev => { applyTheme(...); ... }) updater — the
  // updater form was firing applyTheme()'s synchronous dispatchEvent (which
  // triggers Particle's own setState) *during* React's processing of this
  // component's update, which React (rightly) logs as "Cannot update a
  // component while rendering a different component."
  const lastToggleTime = useRef(0);
  const toggleTheme = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleTime.current < 200) return;
    lastToggleTime.current = now;

    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {isLight ? <BsMoonStarsFill /> : <BsSunFill />}
    </button>
  );
}

export default ThemeToggle;
