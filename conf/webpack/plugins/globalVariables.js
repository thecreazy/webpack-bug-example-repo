const webpack = require("webpack");

module.exports = () => {
  return new webpack.DefinePlugin({
    WEBPACK_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    WEBPACK_NEW_RELIC_FORCE_ENABLED:
      process.env.NEW_RELIC_FORCE_ENABLED === "1",
  });
};
