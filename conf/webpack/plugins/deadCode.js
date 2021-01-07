const DeadCodePlugin = require("webpack-deadcode-plugin");

module.exports = () => {
  return new DeadCodePlugin({
    patterns: ["src/**/*.(js|jsx|css)"],
    exclude: ["**/*.(stories|spec).(js|jsx)"],
  });
};
