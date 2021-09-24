const { src, dest } = require("gulp"),
path = require('../paths'),
browserSync = require("browser-sync").create(),
plumber = require("gulp-plumber"),
uglify = require("gulp-uglify-es").default;

module.exports = function vendorJs() {
    return src(path.src.vendorJs)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(path.build.vendorJs))
    .pipe(browserSync.stream());
};