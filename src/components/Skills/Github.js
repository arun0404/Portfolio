import React, { useState, useEffect, useMemo } from "react";
import GitHubCalendar, { createCalendarTheme } from "react-github-calendar";
import { Row } from "react-bootstrap";
import { THEME_CHANGE_EVENT } from "../ThemeToggle";

// react-activity-calendar's default "empty" cell color is a near-white gray
// (`white` darkened slightly) — right for GitHub's light UI, but it renders
// as a glaring white block against this site's dark background. Build an
// explicit theme per site-theme so the empty cells blend in instead:
// translucent white/black at the same low opacity this site already uses
// for other subtle chrome (see style.css's rgba(255,255,255,0.04-0.25)
// borders), rather than the library's light-mode-only default.
const DARK_THEME = createCalendarTheme("#c770f0", "rgba(255, 255, 255, 0.08)");
const LIGHT_THEME = createCalendarTheme("#5b21b6", "rgba(15, 23, 42, 0.08)");

function getInitialTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function Github() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    function handleThemeChange(event) {
      setTheme(event.detail && event.detail.theme === "light" ? "light" : "dark");
    }
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const calendarTheme = useMemo(
    () => (theme === "light" ? LIGHT_THEME : DARK_THEME),
    [theme]
  );

  // react-github-calendar renders its month/weekday labels, legend, and
  // total-count text as SVG <text fill="currentColor">, so it inherits
  // color from this wrapper — don't hardcode a literal color here again,
  // it needs to track the theme.
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "10px",
        color: "var(--text-color)",
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="arun0404"
        blockSize={30}
        blockMargin={10}
        theme={calendarTheme}
        fontSize={20}
      />
    </Row>
  );
}

export default Github;
