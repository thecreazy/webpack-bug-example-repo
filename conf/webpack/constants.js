module.exports = {
  sassFiles: [
    "global",
    "shared",
    "macro",
    "iconfont",
    "airbnb",
    "away",
    "hold",
    "home",
    "impressum",
    "not-found",
    "privacy-settings",
    "search",
    "seo",
    "sitemap",
    "static",
  ],
  paths: {
    dotEnv: "./.env",
    babelRc: "./babel.config.js",
    public: "public",
    jsPath: "/js/",
    cache: "babel_cache",
  },
  exclude: {
    redis: /redis$/,
    modules: [/node_modules/],
    public: /public/,
    css: /\.(css|scss)$/,
  },
  extensions: [".js", ".jsx", ".scss", ".css"],
  jsExtensions: [".js", ".jsx"],
  watchPull: 500,
};