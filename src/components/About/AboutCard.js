import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m <span className="purple">Arunkumar S</span>, an{" "}
            <span className="purple">AI/ML Engineer</span> from{" "}
            <span className="purple">Bangalore, India</span>, building
            production computer vision and generative AI systems for
            security-sensitive, air-gapped environments — not proofs of
            concept.
            <br />
            <br />
            I work end-to-end in{" "}
            <span className="purple">
              Python, PyTorch, TensorFlow, and FastAPI
            </span>{" "}
            — owning model training, API design, and deployment. My focus is{" "}
            <span className="purple">
              Retrieval-Augmented Generation, Agentic AI
            </span>
            , on-premise LLM inference, and real-time computer vision, built
            with <span className="purple">LangChain &amp; LangGraph</span>{" "}
            and on-device inference stacks like{" "}
            <span className="purple">Ollama</span> and{" "}
            <span className="purple">llama.cpp</span>.
            <br />
            <br />
            A few things I’ve shipped so far:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> A fully offline enterprise RAG platform and TTS
              engine for a defense-sector client
            </li>
            <li className="about-activity">
              <ImPointRight /> A YOLOv8 crash-impact detection model at ~87% mAP
              for a commercial vehicle OEM
            </li>
            <li className="about-activity">
              <ImPointRight /> LoRA/PEFT-tuned LLMs and LangGraph agentic
              document-Q&amp;A pipelines
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Ship measurable accuracy and efficiency gains, not proofs of
            concept."{" "}
          </p>
          <footer className="blockquote-footer">Arun</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
