class WatchRunPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.watchRun.tap("WatchRunPlugin", (comp) => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(
          comp.modifiedFiles,
          (file) => `\n  ${file}`
        ).join("");
        console.log("\n===============================");
        console.log("FILES CHANGED:", changedFiles);
        console.log("===============================");
      }
      if (comp.removedFiles) {
        const removedFiles = Array.from(
          comp.removedFiles,
          (file) => `\n  ${file}`
        ).join("");
        console.log("\n===============================");
        console.log("FILES REMOVED:", removedFiles);
        console.log("===============================");
      }
    });
  }
}

module.exports = () => {
  return new WatchRunPlugin();
};
