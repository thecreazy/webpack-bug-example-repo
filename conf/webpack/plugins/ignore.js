const webpack = require("webpack");

module.exports = (ignore) => {
  return new webpack.IgnorePlugin({ resourceRegExp: ignore });
};
