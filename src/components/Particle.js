import React, { useState, useEffect, useMemo } from "react";
import Particles from "react-tsparticles";
import { THEME_CHANGE_EVENT } from "./ThemeToggle";

// tsparticles paints to a <canvas>, so it can't pick up the light/dark
// theme through CSS the way everything else does — colors need to be
// passed into the particles config directly. This listens for the
// broadcast ThemeToggle.js sends on toggle so dot/link color, size, and
// opacity switch to a visible, high-contrast tone on the light background
// instead of washing out. Movement and mouse interaction below apply the
// same way in both themes.
//
// Note: this uses the legacy particles.js-compatible config keys
// (line_linked, onclick, out_mode, particles_nb, …) rather than the
// modern tsparticles v2 names (links, onClick, outModes, quantity, …) —
// both are accepted by the installed tsparticles@1.43.1, but keep new
// config in this same legacy style for consistency.
function getInitialTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function Particle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    function handleThemeChange(event) {
      setTheme(event.detail && event.detail.theme === "light" ? "light" : "dark");
    }
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const params = useMemo(() => {
    const linkColor = theme === "light" ? "#7c3aed" : "#c770f0";

    const base = {
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 1500,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          opacity: 0.3,
          width: 1,
          color: linkColor,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
        size: {
          value: 1,
        },
        opacity: {
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.05,
          },
        },
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 1,
          },
        },
      },
      retina_detect: true,
      // Caps the render loop instead of letting it track the display's raw
      // refresh rate (tsparticles defaults to 120) — keeps the canvas from
      // doing more work than it needs to, particularly on high-refresh
      // displays, during any burst of other main-thread activity.
      fps_limit: 60,
    };

    // Dark mode keeps the original, untouched dot defaults (no color key
    // set — the library's default reads fine against a dark background).
    if (theme === "light") {
      base.particles.color = { value: "#7c3aed" };
      base.particles.size = { value: 2.2 };
      base.particles.opacity = {
        value: 0.7,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.35,
        },
      };
    }

    return base;
  }, [theme]);

  // Particles are dark-theme-only — unmount entirely in light theme rather
  // than just hiding the canvas, so the animation loop and hover/click
  // interactivity handlers stop running instead of doing invisible work.
  if (theme === "light") return null;

  // react-tsparticles (legacy `params` API) only reads its config on init,
  // so `key` forces a clean re-mount when the theme flips.
  return <Particles id="tsparticles" key={theme} params={params} />;
}

export default Particle;
