"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requireFile = _interopRequireDefault(require("./require-file"));

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class File {
  constructor() {
    // 文件名
    this.filename = ''; // 文件类型

    this.filetype = null; // 相对文件路径

    this.relativePath = ''; // 相对文件夹层级

    this.dirs = []; // 是否文件夹

    this.isDir = false; // 路径

    this.path = '', // 内容
    this.content = null;
  }

}
/**
 * [readFile 读取文件路径]
 * @param  {String} path   [description]
 * @param  {String} filter [description]
 * @return {Array}         [description]
 */


function readFile(path = '', filter = '') {
  return _glob.default.sync(`${path}${filter}`);
}

function requireAll(opt) {
  const dirpath = typeof opt === 'string' ? opt : opt.path;
  const filter = opt.filter === undefined ? DEFAULT_FILTER : opt.filter; // 引入之前

  const onBefore = opt.onBefore || identity; // 引入之后

  const onAfter = opt.onAfter || identity;
  const readFiles = readFile(`${dirpath}${filter}`);
  const fileMap = readFiles.reduce((s, v, i) => {
    const f = new File();
    f.path = v;
    f.relativePath = v.split(dirpath)[1];
    const filepaths = f.relativePath.split(_path.default.sep);
    filepaths.forEach((name, i) => {
      if (i !== filepaths.length - 1) {
        name && f.dirs.push(name);
      } else {
        const filename = name.split('.');
        f.filename = name;
        f.prefix = filename[0];
        f.filetype = filename[1];
      }
    });
    f.isDir = !f.filetype || _fs.default.statSync(v).isDirectory();
    s[f.filename] = f;
    return s;
  }, {}); // 引入

  for (let k in fileMap) {
    onBefore(fileMap[k]);
    fileMap[k].content = onAfter((0, _requireFile.default)(fileMap[k].path), fileMap[k]);
  }

  return fileMap;
}

function identity(val) {
  return val;
} // exports.bindFunc = (func, ctx) => {
//   const data = {}
//   if (typeof func == 'function') {
//     return func.bind(ctx)
//   } else if (typeof func == 'object') {
//     for (const i in func) {
//       data[i] = this.bindFunc(func[i], ctx)
//     }
//   }
//   return data
// }
// exports.readName = (path) => {
//   return (item) => {
//     const fileName = item.split(path)[1];
//     if (fileName.indexOf('.js') != -1) {
//       return fileName.split('.js')[0].replace(/\//g, '.');
//     }
//   }
// }


var _default = requireAll;
exports.default = _default;