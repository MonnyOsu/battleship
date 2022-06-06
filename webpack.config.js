const path = require("path");

module.exports = {
  entry: "./src/index.mjs",
  output: {
    filename: "main.mjs",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
};
