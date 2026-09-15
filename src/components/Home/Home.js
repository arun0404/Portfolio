import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-ai.svg";
import Type from "./Type";
import pdf from "../../Assets/Arunkumar_Resume.pdf";
import { AiOutlineDownload, AiOutlineArrowRight } from "react-icons/ai";

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
                  download="Arunkumar_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
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
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Home;
