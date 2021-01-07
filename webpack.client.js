require("dotenv").config();
const minimist = require("minimist");
const path = require("path");

const alias = require("./conf/webpack/alias");
const fallback = require("./conf/webpack/fallback");
const CONSTANTS = require("./conf/webpack/constants");

const dotEnvPlugin = require("./conf/webpack/plugins/dotenv");
const cssPlugin = require("./conf/webpack/plugins/css");
const ignorePlugin = require("./conf/webpack/plugins/ignore");
const progressBarPlugin = require("./conf/webpack/plugins/progressBar");
const aliasForWebpack5Plugin = require("./conf/webpack/plugins/aliasForWebpack5Plugin");
const processPlugin = require("./conf/webpack/plugins/processPlugin");
const globalVariablesPlugin = require("./conf/webpack/plugins/globalVariables");
const sassLoader = require("./conf/webpack/loaders/sass");
const jsLoader = require("./conf/webpack/loaders/javascript");
const bundleAnalyzePlugin = require("./conf/webpack/plugins/bundleAnalyze");
const deadCodePlugin = require("./conf/webpack/plugins/deadCode");
const watchRunPlugin = require("./conf/webpack/plugins/WatchRunPlugin");
const circularDependencyPlugin = require("./conf/webpack/plugins/circularDependency");

const processArguments = minimist(process.argv.slice(2));
const PRODUCTION = !processArguments.devtool;
const { VERSION } = process.env;

const babelrc = require("./babel.config");

module.exports = (args) => {
  const { PROCESS_WL } = args;
  const sassPath = path.join(__dirname, "src", PROCESS_WL, "scss");
  const buildPath = (args && args.path) || CONSTANTS.paths.public;

  const plugins = [];
  plugins.push(aliasForWebpack5Plugin());
  if (processArguments.watch) plugins.push(watchRunPlugin());
  plugins.push(circularDependencyPlugin());
  plugins.push(dotEnvPlugin(CONSTANTS.paths.dotEnv));
  plugins.push(ignorePlugin(CONSTANTS.exclude.redis));
  plugins.push(cssPlugin());
  plugins.push(progressBarPlugin());
  plugins.push(processPlugin(true, JSON.stringify(PROCESS_WL)));
  plugins.push(globalVariablesPlugin());

  if (processArguments.analyze) {
    plugins.push(bundleAnalyzePlugin());
  }

  if (processArguments.deadcode) {
    plugins.push(deadCodePlugin());
  }

  const rules = [
    ...sassLoader({
      files: CONSTANTS.sassFiles,
      exclude: CONSTANTS.exclude.modules,
      version: VERSION,
      wl: PROCESS_WL,
      sassPath,
    }),
  ];
  rules.push(
    jsLoader({
      exclude: CONSTANTS.exclude.public,
      babelrc,
    })
  );
  const config = {
    mode: PRODUCTION ? "production" : "development",
    target: "web",
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
    watch: !!processArguments.watch,
    devtool: false,
    entry: {
      [`bundle.${VERSION}`]: [
        path.join(__dirname, "src", PROCESS_WL, "js", "client.js"),
      ],
    },
    resolve: {
      extensions: CONSTANTS.extensions,
      alias,
      fallback,
    },
    output: {
      path: path.join(__dirname, buildPath, "js"),
      publicPath: CONSTANTS.paths.jsPath,
      filename: "[name].min.js",
      chunkFilename: `[name].${VERSION}.min.js`,
    },
    module: {
      rules,
    },
    plugins,
    node: {},
    optimization: {
      splitChunks: {
        cacheGroups: {
          core: {
            test: /[\\/]node_modules[\\/](module-core)[\\/]/,
            name: "core",
            // chunks: "all",
          },
          helpers: {
            test: /[\\/]node_modules[\\/](module-helpers)[\\/]/,
            name: "helpers",
            // chunks: "all",
          },
          other_modules: {
            test: /[\\/]node_modules[\\/](module-clerk|module-harbour|module-mason|module-vigilant|module-bumblebee|module-warden|module-bitter|module-contansts|module-toss|module-analytics|module-artboards|module-blacksmith)[\\/]/,
            name: "other_modules",
            // chunks: "all",
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/](react-dom|react-router|luxon|react|react-tippy|react-slider|react-redux|mobile-detect|iconv-lite|pako|elliptic|request|readable-stream|core-js|psl)[\\/]/,
            name: "vendors",
            // chunks: "all",
          },
          default: false,
        },
      },
    },
  };
  if (PRODUCTION) {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
  }
  if (processArguments.watch) {
    config.watchOptions = {
      poll: CONSTANTS.watchPull,
      ignored: ["public", "build"],
    };
  }
  console.log(config);
  return config;
};
