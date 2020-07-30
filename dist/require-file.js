"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileMap = {};

function _default(src) {
  const fileSrc = _path.default.resolve(src);

  if (fileMap[fileSrc]) {
    return fileMap[fileSrc];
  }

  const isExists = _fs.default.existsSync(fileSrc);

  if (isExists) {
    fileMap[fileSrc] = require(fileSrc);
    return fileMap[fileSrc];
  }

  return null;
}