const distAssets = './dist/assets';
const srcAssets = './src/assets';

module.exports = {
  build: {
    html: "dist/",
    js: distAssets + "/js/",
    pagesJs: distAssets + "/js/pages/",
    vendorJs: distAssets + "/js/vendor/",
    css: distAssets + "/css/",
    vendorStyles: distAssets + "/css/vendor/",
    pageStyles: distAssets + "/css/pages/",
    fonts: distAssets + "/fonts/",
    images: distAssets + "/img/",
  },
  src: {
    html: srcAssets + "/pug/pages/*.pug",
    js: srcAssets + "/js/*.js",
    pagesJs: srcAssets + "/js/pages/**/*.js",
    vendorJs: srcAssets + "/js/vendor/**/*.js",
    css: srcAssets + "/styles/scss/style.scss",
    vendorStyles: srcAssets + "/styles/vendor/**/*.css",
    pageStyles: srcAssets + "/styles/scss/pages/*.scss",
    fonts: srcAssets + "/fonts/*.*",
    images: srcAssets + "/img/**/*.{jpg,png,svg,gif,ico}",
  },
  watch: {
    html: srcAssets + "/**/*.pug",
    js: srcAssets + "/js/**/*.js",
    pagesJs: "./src/assets/js/pages/**/*.js",
    vendorJs: "./src/assets/js/vendor/**/*.js",
    css: srcAssets + "/styles/scss/**/*.scss",
    vendorStyles: srcAssets + "/styles/vendor/**/*.css",
    pageStyles: srcAssets + "/styles/scss/pages/*.scss",
    fonts: srcAssets + "/fonts/*.*",
    images: srcAssets + "/img/**/*.{jpg,png,svg,gif,ico}",
  },
  clean: "./dist/",
  fonts: {
    dir: srcAssets + "/fonts/",
    style: srcAssets + "/styles/scss/base/_fonts.scss",
  }

};