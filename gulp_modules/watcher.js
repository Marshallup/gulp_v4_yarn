const { series, watch } = require("gulp"),
path = require('./paths');

module.exports = function watching() {
    watch(path.watch.css, series("styles"));
    watch(path.watch.vendorStyles, series("vendorStyles"));
    watch(path.watch.fonts, series("fonts"));
    watch(path.watch.js, series("js"));
    watch(path.watch.pagesJs, series("pagesJs"));
    watch(path.watch.vendorJs, series("vendorJs"));
    watch(path.watch.pageStyles, series('pageStyles'));
    watch(path.watch.images, series("images"));
    watch(path.watch.html, series("html"));
};