const globImporter = require("node-sass-glob-importer");
const jsonImporter = require("node-sass-json-importer");
const path = require("path");

module.exports = ({ files, exclude, version, wl, sassPath }) => {
  return files.reduce((modules, filename) => {
    modules.push({
      exclude,
      test: [new RegExp(`scss\/?(?:[^\/]+\/?)*\/${filename}.scss`, "gi")],
      use: [
        {
          loader: "file-loader",
          options: {
            name: `${filename}.${version}.min.css`,
            outputPath: `../../public/css/${wl}/`,
          },
        },
        {
          loader: "extract-loader",
        },
        {
          loader: "css-loader",
          options: { url: false },
        },
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
          options: {
            additionalData: `$version: "${version}";`,
            sassOptions: {
              importer: [globImporter(), jsonImporter()],
              includePaths: [
                path.join(sassPath, `${filename}.scss`),
                path.join(sassPath, "scenes", `${filename}.scss`),
              ],
            },
          },
        },
      ],
    });
    return modules;
  }, []);
};
