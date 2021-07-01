"use strict";
const { src, dest, task, series, watch, parallel } = require("gulp"),
  del = require("del"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  postcss = require("gulp-postcss"),
  minifyCss = require("gulp-clean-css"),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  pug = require("gulp-pug"),
  formatHtml = require('gulp-format-html'),
  rename = require("gulp-rename"),
  babel = require("gulp-babel"),
  rigger = require("gulp-rigger"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  imageminJpegRecompress = require("imagemin-jpeg-recompress"),
  pngquant = require("imagemin-pngquant"),
  imageminJpegtran = require("imagemin-jpegtran"),
  // eslint = require('gulp-eslint'),
  // cache = require("gulp-cache"),
  // htmlmin = require("gulp-htmlmin"),
  // imageminWebp = require("imagemin-webp"),
  mode = require("gulp-mode")();

const isProduction = function () {
  if (mode.production()) {
    return {
      mode: "production",
      bool: false,
    };
  } else {
    return {
      mode: "development",
      bool: true,
    };
  }
};
const isDev = isProduction().bool;

const path = {
  build: {
    html: "dist/",
    js: "dist/assets/js/",
    css: "dist/assets/css/",
    fonts: "dist/assets/fonts/",
    images: "dist/assets/img/",
  },
  src: {
    html: "src/assets/pug/pages/*.pug",
    js: "src/assets/js/*.js",
    apart: "./src/assets/js/apart/*.js",
    css: "src/assets/scss/style.scss",
    fonts: "src/assets/fonts/*.*",
    images: "src/assets/img/**/*.{jpg,png,svg,gif,ico}",
  },
  watch: {
    html: "src/assets/**/*.pug",
    js: "src/assets/js/**/*.js",
    apart: "./src/assets/js/apart/**/*.js",
    css: "src/assets/scss/**/*.scss",
    fonts: "src/assets/fonts/*.*",
    images: "src/assets/img/**/*.{jpg,png,svg,gif,ico}",
  },
  clean: "./dist/",
};

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
});

task("clean", () => {
  return del(path.clean);
});

task("html", () => {
  if (isDev) {
    return src(path.src.html)
      .pipe(plumber())
      .pipe(
        pug({
          // Отключил, чтобы самому форматировать html на выходе
          pretty: false,
        })
      )
      .pipe(dest(path.build.html))
      .pipe(reload({ stream: true }));
  } else {
    return (
      src(path.src.html)
        .pipe(plumber())
        .pipe(
          pug({
            pretty: false,
          })
        )
        .pipe(formatHtml(
          {
            "indent_size": 2,
            "indent_with_tabs": false
          }
        ))
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html))
    );
  }
});

task("images", () => {
  if (isDev) {
    return src(path.src.images).pipe(plumber()).pipe(dest(path.build.images));
  } else {
    return (
      src(path.src.images)
        .pipe(plumber())
        .pipe(
          // cache(
          imagemin(
            [
              imagemin.gifsicle({ interlaced: true }),
              imageminJpegtran({ progressive: true }),
              imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                // quality: "medium",
              }),
              imagemin.svgo(),
              imagemin.optipng({ optimizationLevel: 3 }),
              pngquant({
                quality: [0.65, 0.7],
                speed: 5,
              }),
              // imageminWebp(),
            ],
            {
              verbose: true,
            }
          )
        )
        // )
        .pipe(dest(path.build.images))
    );
  }
});

task("styles", () => {
  if (isDev) {
    return src(path.src.css)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss(require("./postcss.config")))
      .pipe(sourcemaps.write())
      .pipe(
        rename({
          suffix: ".min",
          extname: ".css",
        })
      )
      .pipe(dest(path.build.css))
      .pipe(reload({ stream: true }));
  } else {
    return src(path.src.css)
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss(require("./postcss.config")))
      .pipe(dest(path.build.css))
      .pipe(minifyCss())
      .pipe(
        rename({
          suffix: ".min",
          extname: ".css",
        })
      )
      .pipe(dest(path.build.css))
      .pipe(reload({ stream: true }));
  }
});

task("js", () => {
  if (isDev) {
    return src(path.src.js)
      // .pipe(eslint())
      .pipe(plumber())
      // .pipe(eslint.format())
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
      .pipe(dest(path.build.js));
  }
});

task("fonts", () => {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
});

task("apart", () => {
  return src(path.src.apart)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
});

task("watch", () => {
  watch(path.watch.css, series("styles"));
  watch(path.watch.fonts, series("fonts"));
  watch(path.watch.js, series("js"));
  watch(path.watch.apart, series("apart"));
  watch(path.watch.images, series("images"));
  watch(path.watch.html, series("html"));
});

task(
  "default",
  series(
    "clean",
    parallel("styles", "fonts", "html", "images", "js", "apart"),
    parallel("watch", "server")
  )
);
task(
  "build",
  series("clean", parallel("styles", "fonts", "images", "html", "js", "apart"))
);
