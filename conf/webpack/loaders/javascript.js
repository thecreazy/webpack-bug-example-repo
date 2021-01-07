const CONSTANTS = require("../constants");

module.exports = ({ exclude, babelrc, cache }) => {
  const options = {
    ...babelrc,
  };
  if (cache) options.cacheDirectory = cache;

  return {
    test: /\.(js|jsx)?$/,
    resolve: { extensions: CONSTANTS.jsExtensions },
    exclude,
    use: {
      loader: "babel-loader",
      options,
    },
  };
};
