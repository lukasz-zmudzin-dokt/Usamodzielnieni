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

// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleString = function (locale = "en-US", ...args) {
  return this.getTime() + `_${locale}_${JSON.stringify(args).length}_`;
};

// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleDateString = function (locale = "en-US", ...args) {
  return this.getTime() + `_date_${locale}_${JSON.stringify(args).length}_`;
};

// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleTimeString = function (locale = "en-US", ...args) {
  return this.getTime() + `_time_${locale}_${JSON.stringify(args).length}_`;
};
