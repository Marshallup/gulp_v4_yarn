const { src, dest } = require("gulp"),
path = require('../paths'),
modeProd = require('../gulp_mode')(),
rootPath = require('root-path'),
browserSync = require("browser-sync").create(),
reload = browserSync.reload,
sourcemaps = require("gulp-sourcemaps"),
plumber = require("gulp-plumber"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
bulkSass = require('gulp-sass-bulk-importer'),
minifyCss = require("gulp-clean-css"),
rename = require("gulp-rename");

module.exports = function pageStyles() {
    if (!modeProd) {
        return src(path.src.pageStyles)
            .pipe(plumber())
            .pipe(bulkSass())
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            .pipe(postcss(require(rootPath("postcss.config"))))
            .pipe(sourcemaps.write())
            .pipe(
            rename({
                suffix: ".min",
                extname: ".css",
            })
            )
            .pipe(dest(path.build.pageStyles))
            .pipe(reload({ stream: true }));
      } else {
        return src(path.src.pageStyles)
          .pipe(bulkSass())
          .pipe(sass().on("error", sass.logError))
          .pipe(postcss(require(rootPath("postcss.config"))))
          .pipe(dest(path.build.css))
          .pipe(minifyCss())
          .pipe(
            rename({
              suffix: ".min",
              extname: ".css",
            })
          )
          .pipe(dest(path.build.pageStyles))
          .pipe(reload({ stream: true }));
    }
};