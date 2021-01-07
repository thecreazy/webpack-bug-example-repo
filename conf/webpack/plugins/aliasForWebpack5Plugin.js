const webpack = require("webpack");

module.exports = () => {
  return new webpack.ProvidePlugin({
    process: "process/browser",
    Buffer: ["buffer", "Buffer"],
  });
};
