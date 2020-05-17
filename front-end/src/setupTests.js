import "@testing-library/jest-dom/extend-expect";

// https://github.com/popperjs/popper-core/issues/478#issuecomment-407422016
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  });
}
