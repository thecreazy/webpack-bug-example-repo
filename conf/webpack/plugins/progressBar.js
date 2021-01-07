const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = () => {
  return new ProgressBarPlugin({
    format: `build [:bar] ${chalk.green.bold(":percent")} (:elapsed seconds)`,
    clear: false,
  });
};
