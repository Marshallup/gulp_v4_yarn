const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
browserSync = require("browser-sync"),
sourcemaps = require("gulp-sourcemaps"),
babel = require("gulp-babel"),
rigger = require("gulp-rigger"),
rename = require("gulp-rename"),
uglify = require("gulp-uglify-es").default,
size = require('gulp-size'),
plumber = require("gulp-plumber");

module.exports = function js() {

  if (!modeProd) {
    return src(path.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(rigger())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
  } else {
    return src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(size({
      showFiles: true,
      title: 'Общие Javascript файлы: --===--',
    }));
  }
};