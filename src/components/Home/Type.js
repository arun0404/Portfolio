import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <div className="typewriter-no-select">
      <Typewriter
        options={{
          strings: [
            "AI/ML Engineer",
            "Computer Vision Engineer",
            "Generative AI Developer",
            "RAG & Agentic AI Builder",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}

export default Type;
