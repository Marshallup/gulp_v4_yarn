const { src, dest } = require("gulp"),
path = require('../paths'),
browserSync = require("browser-sync").create(),
plumber = require("gulp-plumber"),
uglify = require("gulp-uglify-es").default;

module.exports = function pagesJs() {
    return src(path.src.pagesJs)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(path.build.pagesJs))
    .pipe(browserSync.stream());
};