import React, { useState, useEffect } from "react";
import { CgGitFork } from "react-icons/cg";
import {
  AiFillGithub,
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineFundProjectionScreen,
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlineClose,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = ["home", "skills", "projects", "journey", "contact"];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: AiOutlineHome },
  { id: "skills", label: "Skills", icon: AiOutlineTool },
  { id: "projects", label: "Projects", icon: AiOutlineFundProjectionScreen },
  { id: "journey", label: "Timeline", icon: AiOutlineClockCircle },
  { id: "contact", label: "Contact", icon: AiOutlineMail },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    function scrollHandler() {
      setScrolled(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Scroll-spy: highlight whichever section is currently crossing the
  // vertical center of the viewport, rather than reacting to raw
  // intersection ratio — sections here vary a lot in height (Home's tall
  // hero+journey vs. Contact's shorter content), so a plain ratio
  // comparison would favor the tallest section almost all the time.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveSection(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll while the overlay is open, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={"site-bar" + (scrolled ? " site-bar--scrolled" : "")}>
        <div className="site-bar__left">
          <a href="#home" className="site-bar__mark" aria-label="Arun — back to top">
            Ak<span className="site-bar__dot">.</span>
          </a>
          <span className="site-bar__eyebrow">Train — Ship — Deploy — Iterate</span>
        </div>

        <div className="site-bar__actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-pill"
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            onClick={() => setMenuOpen(true)}
          >
            Menu
            <span className="menu-pill__icon" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </header>

      <div
        id="nav-overlay"
        className={"menu-overlay" + (menuOpen ? " menu-overlay--open" : "")}
        aria-hidden={!menuOpen}
      >
        <div className="menu-overlay__topbar">
          <a href="#home" className="site-bar__mark" onClick={closeMenu} aria-label="Arun — back to top">
            Ak<span className="site-bar__dot">.</span>
          </a>
          <button type="button" className="menu-pill" onClick={closeMenu}>
            Close
            <AiOutlineClose className="menu-pill__icon" aria-hidden="true" />
          </button>
        </div>

        <nav className="menu-overlay__list" aria-label="Section navigation">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className={
                "menu-overlay__link" +
                (activeSection === item.id ? " menu-overlay__link--active" : "")
              }
            >
              <span className="menu-overlay__index">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu-overlay__footer">
          <span>Bangalore, India</span>
          <div className="menu-overlay__footer-links">
            <a
              href="https://github.com/arun0404"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/arun0404/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/arun0404/Portfolio"
              target="_blank"
              rel="noreferrer"
              aria-label="Fork this repo on GitHub"
            >
              <CgGitFork />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
