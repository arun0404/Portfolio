import React, { useState, useMemo, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import ragPlatform from "../../Assets/Projects/rag-platform.svg";
import ttsEngine from "../../Assets/Projects/tts-engine.svg";
import crashDetection from "../../Assets/Projects/crash-detection.svg";
import blenderAutomation from "../../Assets/Projects/blender-automation.svg";
import cbtReader from "../../Assets/Projects/cbt-reader.svg";
import voiceChatbot from "../../Assets/Projects/voice-chatbot.svg";

const PROJECTS = [
  {
    id: "rag-platform",
    imgPath: ragPlatform,
    title: "Offline Enterprise RAG Platform",
    description:
      "Designed and built a fully offline Retrieval-Augmented Generation platform for a defense-sector client with strict data-residency requirements — PDF ingestion, semantic chunking, embedding generation, and context-aware retrieval using Ollama, Qdrant, Podman, and WSL2.",
    tag: "Confidential — Defense-Sector Client",
    categories: ["RAG"],
  },
  {
    id: "tts-engine",
    imgPath: ttsEngine,
    title: "Offline TTS Engine",
    description:
      "Built a fully offline text-to-speech engine with word-level synchronized highlighting and an intelligent text-normalization layer for engineering abbreviations, units, and symbols. A custom caching layer cut repeated-inference latency and kept playback responsive.",
    tag: "Confidential — Defense-Sector Client",
    categories: ["Voice AI"],
  },
  {
    id: "crash-detection",
    imgPath: crashDetection,
    title: "YOLOv8 Crash Impact Detection",
    description:
      "Trained and deployed a YOLOv8/OpenCV model for real-time vehicle damage assessment, reaching ~87% mAP across three severity classes and cutting manual inspection effort by ~50% for a leading commercial vehicle OEM.",
    tag: "Confidential — Commercial Vehicle OEM",
    categories: ["Computer Vision"],
  },
  {
    id: "blender-automation",
    imgPath: blenderAutomation,
    title: "3D-to-2D Documentation Automation",
    description:
      "Built a Blender + Python pipeline that programmatically explodes CAD assemblies and generates callouts, converting 3D models into structured SVG line-art and reducing manual technical-illustration time by over 70%.",
    tag: "Confidential — Automotive OEM",
    categories: ["Automation"],
  },
  {
    id: "cbt-reader",
    imgPath: cbtReader,
    title: "CBT — Offline Desktop TTS Reader",
    description:
      "Built a fully air-gapped Windows desktop reader pairing Piper neural TTS with torchaudio's MMS_FA forced-alignment model for word-level synchronized highlighting. Smart text preprocessing handles abbreviations, units, and acronyms, with client-side playback speed changes that need no re-synthesis.",
    ghLink: "https://github.com/arun0404/CBT",
    tag: "Personal Project — Self-Directed",
    categories: ["Voice AI"],
  },
  {
    id: "voice-chatbot",
    imgPath: voiceChatbot,
    title: "RAG-Powered Gen-AI Chatbot with Voice Interface",
    description:
      "Designed and built a full-stack RAG chatbot end-to-end in personal time — Flask, FAISS, LangChain, and AWS Bedrock — supporting PDF upload and vector-based retrieval at ~83% retrieval accuracy. Extended with a full voice interface using AWS Polly (TTS) and Transcribe (STT).",
    tag: "Personal Project — Self-Directed",
    categories: ["RAG", "Voice AI"],
  },
];

const CATEGORIES = ["All", "RAG", "Computer Vision", "Voice AI", "Automation"];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Skip the state update (and the re-render it would schedule) when a
  // chip that's already active gets clicked again, and throttle so a burst
  // of clicks within 150ms of each other collapses to one state change
  // instead of queuing one per click.
  const lastClickTime = useRef(0);
  const handleCategoryChange = (category) => {
    const now = Date.now();
    if (now - lastClickTime.current < 150) return;
    lastClickTime.current = now;

    if (selectedCategory !== category) {
      setSelectedCategory(category);
    }
  };

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.categories.includes(selectedCategory);
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "var(--text-color)" }}>
          Here are a few things I've built recently, most on the job and one
          on my own time.
        </p>

        <div
          className="project-filter-bar"
          style={{ position: "relative", zIndex: 10 }}
        >
          <input
            type="search"
            className="project-search-input"
            placeholder="Search projects…"
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
          <div
            className="project-filter-chips"
            style={{ position: "relative", zIndex: 10 }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  "project-filter-chip no-select" +
                  (selectedCategory === category ? " active" : "")
                }
                onClick={() => handleCategoryChange(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {filteredProjects.map((project) => (
            <Col md={4} className="project-card" key={project.id}>
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={false}
                title={project.title}
                description={project.description}
                tag={project.tag}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}

          {filteredProjects.length === 0 && (
            <p className="project-empty-state">
              No projects match "{searchTerm}"
              {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}.
            </p>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
