const { src, dest } = require("gulp"),
path = require('./paths'),
modeProd = require('./gulp_mode')(),
browserSync = require("browser-sync").create(),
plumber = require("gulp-plumber"),
imageminJpegRecompress = require("imagemin-jpeg-recompress"),
pngquant = require("imagemin-pngquant"),
imageminJpegtran = require("imagemin-jpegtran"),
imagemin = require("gulp-imagemin");

module.exports = function images() {
    if (!modeProd) {
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
}