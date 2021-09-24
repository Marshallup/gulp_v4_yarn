module.exports = {
  plugins: [
    require("postcss-easy-import")({
      extensions: ".css",
    }),
    require("autoprefixer"),
    require("postcss-sorting")({
      order: [
        "custom-properties",
        "dollar-variables",
        "declarations",
        "at-rules",
        "rules",
      ],
      "properties-order": "alphabetical",
      "unspecified-properties-position": "bottom",
    }),
    require('postcss-prettify')
  ],
};
