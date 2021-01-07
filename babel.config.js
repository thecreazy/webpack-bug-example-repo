module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        debug: false,
        exclude: ["proposal-dynamic-import"],
        targets: {
          node: "current",
          browsers: [">0.25%", "ie>10"],
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        targets: {
          node: "current",
          browsers: [">0.25%", "ie>10"],
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-proposal-do-expressions"],
    ["@babel/plugin-proposal-optional-chaining"],
  ],
};
