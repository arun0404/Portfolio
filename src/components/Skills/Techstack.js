import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiOpencv,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiFlask,
  SiOnnx,
  SiNvidia,
  SiPodman,
  SiLinux,
  SiJupyter,
  SiBlender,
} from "react-icons/si";
import Python from "../../Assets/TechIcons/Python.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import SQL from "../../Assets/TechIcons/SQL.svg";
import AWS from "../../Assets/TechIcons/AWS.svg";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Python} alt="Python" />
        <div className="tech-icons-text">Python</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPytorch fontSize={"24px"} />
        <div className="tech-icons-text">PyTorch</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow fontSize={"24px"} />
        <div className="tech-icons-text">TensorFlow</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKeras fontSize={"24px"} />
        <div className="tech-icons-text">Keras</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOpencv fontSize={"24px"} />
        <div className="tech-icons-text">OpenCV</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="YOLO">
          🎯
        </span>
        <div className="tech-icons-text">YOLOv8</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiScikitlearn fontSize={"24px"} />
        <div className="tech-icons-text">scikit-learn</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNumpy fontSize={"24px"} />
        <div className="tech-icons-text">NumPy</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPandas fontSize={"24px"} />
        <div className="tech-icons-text">Pandas</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Hugging Face">
          🤗
        </span>
        <div className="tech-icons-text">Hugging Face</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="LangChain">
          🦜
        </span>
        <div className="tech-icons-text">LangChain</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="LangGraph">
          🕸️
        </span>
        <div className="tech-icons-text">LangGraph</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="RAG">
          📚
        </span>
        <div className="tech-icons-text">RAG</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Ollama">
          🦙
        </span>
        <div className="tech-icons-text">Ollama</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <span style={{ fontSize: "22px" }} role="img" aria-label="Vector DB">
          🧮
        </span>
        <div className="tech-icons-text">Qdrant / FAISS</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi fontSize={"24px"} />
        <div className="tech-icons-text">FastAPI</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFlask fontSize={"24px"} />
        <div className="tech-icons-text">Flask</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={SQL} alt="SQL" />
        <div className="tech-icons-text">SQL</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOnnx fontSize={"24px"} />
        <div className="tech-icons-text">ONNX</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNvidia fontSize={"24px"} />
        <div className="tech-icons-text">CUDA</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Docker} alt="Docker" />
        <div className="tech-icons-text">Docker</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPodman fontSize={"24px"} />
        <div className="tech-icons-text">Podman</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux fontSize={"24px"} />
        <div className="tech-icons-text">Linux / WSL2</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Git} alt="Git" />
        <div className="tech-icons-text">Git</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={AWS} alt="AWS" className="tech-icon-images" />
        <div className="tech-icons-text">AWS</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJupyter fontSize={"24px"} />
        <div className="tech-icons-text">Jupyter</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiBlender fontSize={"24px"} />
        <div className="tech-icons-text">Blender API</div>
      </Col>
    </Row>
  );
}

export default Techstack;
