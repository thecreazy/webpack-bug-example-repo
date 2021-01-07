const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = () => {
  return new CircularDependencyPlugin({
    exclude: /node_modules/,
    include: /src/,
    failOnError: true,
    allowAsyncCycles: false,
  });
};
