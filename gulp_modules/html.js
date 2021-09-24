const { src, dest } = require("gulp"),
path = require('./paths'),
modeProd = require('./gulp_mode')(),
plumber = require("gulp-plumber"),
reload = require("browser-sync").create().reload,
formatHtml = require('gulp-format-html'),
pug = require("gulp-pug");

module.exports = function html() {
    if (!modeProd) {
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
};