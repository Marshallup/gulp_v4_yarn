const { src, dest } = require("gulp"),
path = require('./paths'),
del = require("del");

module.exports = function cleanDir() {
    return del(path.clean);
};