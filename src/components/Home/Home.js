import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-ai.svg";
import Type from "./Type";
import pdf from "../../Assets/Arunkumar_Resume.pdf";
import { AiOutlineDownload, AiOutlineArrowRight } from "react-icons/ai";

const RESUME_FILENAME = "ArunKumar_Resume.pdf";

// Vercel (and most static-asset CDNs) serve this file with its own
// Content-Disposition header, naming it after the webpack content hash in
// its on-disk filename (e.g. "Arunkumar_Resume.2f311e6bc705becbfd6e.pdf")
// — browsers save using that server-provided filename instead of this
// link's `download` attribute, which only applies when there's no
// competing Content-Disposition. Fetching the file into a blob and
// downloading *that* sidesteps the response headers entirely, so the
// `download` attribute is honored everywhere, not just on the dev server
// (which doesn't set Content-Disposition and "worked" by accident).
async function handleResumeDownload(event) {
  event.preventDefault();
  try {
    const response = await fetch(pdf);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = RESUME_FILENAME;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } catch {
    // fetch failed (offline, etc.) — fall back to a plain navigation so the
    // PDF still opens, even if the saved name ends up host-dependent.
    window.location.assign(pdf);
  }
}

function Home() {
  return (
    <>
      <Container fluid className="home-section">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <p className="hero-eyebrow purple">Crafting AI systems that ship</p>

              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> ARUN KUMAR</strong>
              </h1>

              <div
                className="hero-type-wrap"
                style={{ paddingTop: 30, paddingBottom: 10, textAlign: "left" }}
              >
                <Type />
              </div>

              <p className="hero-pitch">
                Building computer vision and generative AI systems that
                ship — not proofs of concept. Offline RAG platforms,
                real-time detection models, and agentic pipelines for
                security-sensitive environments.
              </p>

              <div className="hero-cta-row">
                <a
                  href={pdf}
                  download={RESUME_FILENAME}
                  onClick={handleResumeDownload}
                  className="pill-btn pill-btn--primary"
                >
                  <AiOutlineDownload />
                  Download CV
                </a>
                <a href="#contact" className="pill-btn pill-btn--ghost">
                  Let's Connect
                  <AiOutlineArrowRight />
                </a>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <div className="hero-illustration">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Home;
