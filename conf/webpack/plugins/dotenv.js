const Dotenv = require("dotenv-webpack");

module.exports = (dotEnvPath) => {
  return new Dotenv({
    path: dotEnvPath,
  });
};
