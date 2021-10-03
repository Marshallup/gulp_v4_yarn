const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
reload = require("browser-sync").create().reload,
sourcemaps = require("gulp-sourcemaps"),
plumber = require("gulp-plumber");

module.exports = function vendorStyles() {
  if (!modeProd) {
    return src(path.src.vendorStyles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(dest(path.build.vendorStyles))
      .pipe(reload({ stream: true }));
  } else {
    return src(path.src.vendorStyles)
      .pipe(dest(path.build.vendorStyles));
  }
};