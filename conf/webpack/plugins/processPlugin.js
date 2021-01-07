const webpack = require("webpack");

module.exports = (isBrowser, wl) => {
  const conf = isBrowser
    ? {
        "process.wl_name": wl,
        "process.browser": true,
      }
    : {
        "process.browser": false,
      };

  return new webpack.DefinePlugin(conf);
};
