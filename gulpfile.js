"use strict";
const { task, series, parallel } = require("gulp"),
  requireDir = require('require-dir'),
  modules = requireDir('./gulp_modules', { recurse: true });

exports.server = modules.server;
exports.cleanDir = modules.cleanDir;
exports.html = modules.html;
exports.fonts = modules.fonts.fonts;
exports.images = modules.images;
exports.js = modules.scripts.general_js;
exports.pagesJs = modules.scripts.pages_js;
exports.vendorJs = modules.scripts.vendor_js;
exports.styles = modules.styles.general_styles;
exports.vendorStyles = modules.styles.vendor_styles;
exports.pageStyles = modules.styles.pages_styles;
exports.watch = modules.watcher;

task(
  "default",
  series(
    exports.cleanDir,
    parallel(
      exports.styles,
      exports.vendorStyles,
      exports.pageStyles,
      exports.fonts,
      exports.html,
      exports.images,
      exports.js,
      exports.pagesJs,
      exports.vendorJs
    ),
    parallel(
      exports.watch,
      exports.server
    )
  )
);

task(
  "build",
  series(
    exports.cleanDir,
    parallel(
      exports.styles,
      exports.vendorStyles,
      exports.pageStyles,
      exports.fonts,
      exports.images,
      exports.html,
      exports.js,
      exports.pagesJs,
      exports.vendorJs
    )
  )
);
