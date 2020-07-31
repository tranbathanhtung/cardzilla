/**
 * Override things of the default create-react-app configuration here
 *
 * This is using react-app-rewired by @timarney
 */
const {
  override,
  addWebpackModuleRule,
} = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: /\.txt$/,
      use: "raw-loader",
    })
  ),
};
