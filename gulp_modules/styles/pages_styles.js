const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
rootPath = require('root-path'),
gulpif = require('gulp-if'),
browserSync = require("browser-sync").create(),
reload = browserSync.reload,
sourcemaps = require("gulp-sourcemaps"),
plumber = require("gulp-plumber"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
bulkSass = require('gulp-sass-bulk-importer'),
minifyCss = require("gulp-clean-css"),
cssSvg = require('gulp-css-svg'),
cssBase64 = require('gulp-css-base64'),
rename = require("gulp-rename");

module.exports = function pageStyles() {

  return src(path.src.pageStyles)
    .pipe(gulpif(!modeProd, plumber()))
    .pipe(bulkSass())
    .pipe(gulpif(!modeProd, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(require(rootPath("postcss.config"))))
    .pipe(gulpif(!modeProd, sourcemaps.write()))
    .pipe(gulpif(!modeProd,
      rename({
        suffix: ".min",
        extname: ".css",
      })
    ))
    .pipe(cssSvg({
      baseDir: "../../../img"
    }))
    .pipe(cssBase64({
      baseDir: "../../../img",
      extensionsAllowed: ['.gif', '.jpg', '.jpeg', '.png']
    }))
    .pipe(dest(path.build.pageStyles))
    .pipe(gulpif(!modeProd, reload({ stream: true })))
    .pipe(gulpif(modeProd, minifyCss()))
    .pipe(gulpif(modeProd,
      rename({
        suffix: ".min",
        extname: ".css",
      })
    ))
    .pipe(gulpif(modeProd, dest(path.build.pageStyles)))
};