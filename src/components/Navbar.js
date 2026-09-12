import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { CgGitFork } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = ["home", "about", "projects", "resume", "contact"];

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  // Scroll-spy: highlight whichever section is currently crossing the
  // vertical center of the viewport, rather than reacting to raw
  // intersection ratio — sections here vary a lot in height (Home's
  // full-viewport hero vs. Contact's shorter content), so a plain ratio
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

  const navLinkClass = (id) =>
    activeSection === id ? "active" : undefined;

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex logo-text">
          Ak.
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link
                href="#home"
                className={navLinkClass("home")}
                aria-current={activeSection === "home" ? "true" : undefined}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#about"
                className={navLinkClass("about")}
                aria-current={activeSection === "about" ? "true" : undefined}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#projects"
                className={navLinkClass("projects")}
                aria-current={activeSection === "projects" ? "true" : undefined}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#resume"
                className={navLinkClass("resume")}
                aria-current={activeSection === "resume" ? "true" : undefined}
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#contact"
                className={navLinkClass("contact")}
                aria-current={activeSection === "contact" ? "true" : undefined}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineMail style={{ marginBottom: "2px" }} /> Contact
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="theme-toggle-item">
              <ThemeToggle />
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/arun0404/Portfolio"
                target="_blank"
                className="fork-btn-inner"
                aria-label="Fork this repo on GitHub"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
