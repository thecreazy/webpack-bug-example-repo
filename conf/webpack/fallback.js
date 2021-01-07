module.exports = {
  fs: false,
  net: false,
  tls: false,
  console: false,
  child_process: false,
  path: require.resolve("path-browserify"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("stream-browserify"),
  https: require.resolve("https-browserify"),
  http: require.resolve("stream-http"),
  zlib: require.resolve("browserify-zlib"),
};
