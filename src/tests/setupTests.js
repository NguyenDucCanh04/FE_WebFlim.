import '@testing-library/jest-dom'

// Polyfill for window.matchMedia needed by some components
window.matchMedia = window.matchMedia || function() {
  return { matches: false, addListener: () => {}, removeListener: () => {} };
};
