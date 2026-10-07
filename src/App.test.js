import { render } from "@testing-library/react";
import App from "./App";

test("renders all five page sections", () => {
  const { container } = render(<App />);
  ["home", "skills", "projects", "journey", "contact"].forEach((id) => {
    expect(container.querySelector(`#${id}`)).toBeInTheDocument();
  });
});
