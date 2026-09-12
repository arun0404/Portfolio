import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Contact() {
  return (
    <Container fluid className="contact-section">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={8} className="contact-text">
            <h1 className="project-heading">
              Let's <strong className="purple">Connect</strong>
            </h1>
            <p>
              I'm always open to discussing AI/ML roles, computer vision and
              generative AI projects, or just talking shop. Whether you're a
              recruiter, a fellow engineer, or curious about my work — feel
              free to reach out, I'll get back to you as soon as I can.
            </p>

            <Button
              variant="primary"
              href="mailto:0404arun@gmail.com"
              className="contact-mail-btn"
            >
              <AiOutlineMail />
              &nbsp;Say Hello
            </Button>

            <ul className="home-about-social-links contact-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/arun0404"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/arun0404/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:0404arun@gmail.com"
                  className="icon-colour  home-social-icons"
                  aria-label="Email"
                >
                  <AiOutlineMail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
