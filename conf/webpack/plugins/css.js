const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = () => {
  return new OptimizeCssAssetsPlugin({
    // cssProcessor: require("cssnano"),
    cssProcessorPluginOptions: {
      preset: ["default", { discardComments: { removeAll: true } }],
    },
  });
};
