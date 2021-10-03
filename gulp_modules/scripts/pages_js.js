const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
browserSync = require("browser-sync"),
gulpif = require('gulp-if'),
sourcemaps = require("gulp-sourcemaps"),
babel = require("gulp-babel"),
rigger = require("gulp-rigger"),
rename = require("gulp-rename"),
uglify = require("gulp-uglify-es").default,
size = require('gulp-size'),
plumber = require("gulp-plumber");

module.exports = function pagesJs() {

    return src(path.src.pagesJs)
    .pipe(gulpif(!modeProd, plumber()))
    .pipe(gulpif(!modeProd, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(rigger())
    .pipe(gulpif(!modeProd,
      rename({
        suffix: ".min",
        extname: ".js",
      })
    ))
    .pipe(gulpif(!modeProd, sourcemaps.write()))
    .pipe(gulpif(!modeProd, dest(path.build.pagesJs)))
    .pipe(gulpif(!modeProd, browserSync.stream()))
    .pipe(gulpif(modeProd, dest(path.build.pagesJs)))
    .pipe(gulpif(modeProd, uglify()))
    .pipe(gulpif(modeProd,
      rename({
        suffix: ".min",
        extname: ".js",
      })
    ))
    .pipe(gulpif(modeProd, dest(path.build.pagesJs)))
    .pipe(gulpif(modeProd,
      size({
        showFiles: true,
        title: 'Общие Javascript файлы: --===--',
      })
    ))
};