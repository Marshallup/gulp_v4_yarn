const { src, dest } = require('gulp'),
path = require('../paths');

module.exports = function fonts() {
    return src(path.src.fonts).pipe(dest(path.build.fonts));
}