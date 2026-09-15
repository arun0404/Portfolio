import React from "react";
import { Col, Row } from "react-bootstrap";
import { VscCopilot } from "react-icons/vsc";
import { SiGooglecolab } from "react-icons/si";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import Postman from "../../Assets/TechIcons/Postman.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={vsCode} alt="VS Code" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Cursor">
          🖱️
        </span>
        <div className="tech-icons-text">Cursor</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <VscCopilot fontSize={"24px"} />
        <div className="tech-icons-text">GitHub Copilot</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Claude Code">
          🤖
        </span>
        <div className="tech-icons-text">Claude Code</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="LangSmith">
          🔍
        </span>
        <div className="tech-icons-text">LangSmith</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Ollama">
          🦙
        </span>
        <div className="tech-icons-text">Ollama</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Git} alt="Git" className="tech-icon-images" />
        <div className="tech-icons-text">Git &amp; GitHub</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Docker} alt="Docker" className="tech-icon-images" />
        <div className="tech-icons-text">Docker / Podman</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Postman} alt="Postman" className="tech-icon-images" />
        <div className="tech-icons-text">Postman</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecolab fontSize={"24px"} />
        <div className="tech-icons-text">Colab / Jupyter</div>
      </Col>
    </Row>
  );
}

export default Toolstack;
