// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver, which Navbar.js uses to
// track the active section — stub it so component tests can mount it.
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom doesn't implement ResizeObserver either, which react-three-fiber's
// <Canvas> (SpaceBackground.js) uses via react-use-measure to track its
// container size — same gap, same stub pattern as above.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
