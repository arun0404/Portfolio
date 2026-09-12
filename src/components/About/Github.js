import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  // react-github-calendar renders its month/weekday labels, legend, and
  // total-count text as SVG <text fill="currentColor">, so it inherits
  // color from this wrapper — don't hardcode a literal color here again,
  // it needs to track the theme.
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "10px",
        color: "var(--text-color)",
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="arun0404"
        blockSize={30}
        blockMargin={10}
        color="#c084f5"
        fontSize={20}
      />
    </Row>
  );
}

export default Github;
