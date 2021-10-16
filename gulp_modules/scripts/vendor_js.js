const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
browserSync = require("browser-sync").create(),
gulpif = require('gulp-if'),
plumber = require("gulp-plumber"),
uglify = require("gulp-uglify-es").default;

module.exports = function vendorJs() {
    return src(path.src.vendorJs)
    .pipe(gulpif(!modeProd, plumber()))
    .pipe(uglify())
    .pipe(dest(path.build.vendorJs))
    .pipe(gulpif(!modeProd, browserSync.stream()));
};