import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Journey timeline data — each entry is one flowing paragraph (not
// bullets) plus a separate row of tech-stack pill badges, styled after
// a reference "vertical year-axis" timeline layout. Rendered as its own
// <section id="journey"> in App.js; this used to be its own routed-in
// "Resume" section, then briefly lived inside Home before moving here.
const EXPERIENCE = [
  {
    id: "ggs",
    title: "Jr. Software Engineer",
    org: "GGS Information Services Pvt. Ltd · Bangalore, India",
    date: "Jun 2024 — Present",
    description:
      "Building production computer vision and generative AI systems for security-sensitive, air-gapped environments — including a fully offline enterprise RAG platform for a defense-sector client, a YOLOv8 crash-impact detection model reaching ~87% mAP that cut manual inspection effort by ~50%, and agentic document Q&A pipelines orchestrated across 4+ tools and traced end-to-end with LangSmith.",
    tags: ["Python", "PyTorch", "YOLOv8", "LangChain", "LangGraph", "Ollama", "FastAPI"],
  },
  {
    id: "voice-chatbot",
    title: "RAG-Powered Gen-AI Chatbot with Voice Interface",
    org: "Personal Project",
    date: "Self-Directed",
    description:
      "Built a full-stack RAG chatbot end-to-end, reaching ~83% retrieval accuracy, then extended it with a full voice interface for spoken question-and-answer interaction.",
    tags: ["Flask", "FAISS", "LangChain", "AWS Bedrock", "AWS Polly", "AWS Transcribe"],
  },
];

const EDUCATION = [
  {
    id: "srm",
    title: "B.Tech, Information Technology",
    org: "SRM Easwari Engineering College · Chennai, India",
    date: "2020 — 2024",
    description: "",
    tags: [],
  },
];

function JourneyEntry({ item }) {
  return (
    <div className="journey-entry">
      <span className="journey-entry-dot" />
      <span className="journey-entry-date purple">{item.date}</span>
      <h4 className="journey-entry-title">{item.title}</h4>
      <p className="journey-entry-org">{item.org}</p>
      {item.description && (
        <p className="journey-entry-desc">{item.description}</p>
      )}
      {item.tags.length > 0 && (
        <div className="journey-entry-tags">
          {item.tags.map((tag) => (
            <span className="journey-entry-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Journey() {
  return (
    <Container className="journey-wrap">
      <Row style={{ justifyContent: "center" }}>
        <Col md={9}>
          <h2 className="journey-heading">
            MY <span className="purple">JOURNEY</span>
          </h2>

          <h3 className="journey-subheading">Experience</h3>
          <div className="journey-track">
            {EXPERIENCE.map((item) => (
              <JourneyEntry item={item} key={item.id} />
            ))}
          </div>

          <h3 className="journey-subheading">Education</h3>
          <div className="journey-track">
            {EDUCATION.map((item) => (
              <JourneyEntry item={item} key={item.id} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Journey;
