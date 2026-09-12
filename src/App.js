import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import ResumeNew from "./components/Resume/ResumeNew";
import Contact from "./components/Contact/Contact";
import Particle from "./components/Particle";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Particle />
        <Navbar />
        <div className="page-content">
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="resume">
            <ResumeNew />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
