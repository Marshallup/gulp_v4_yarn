const mode = require("gulp-mode")();

module.exports = function isProduction () {
  if (mode.production()) {
    return true;
  }
  return false;
};