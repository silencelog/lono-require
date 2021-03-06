import path from 'path'
import fs from 'fs'
const fileMap = {}

export default function (src) {
  const fileSrc = path.resolve(src)
  if (fileMap[fileSrc]) {
    return fileMap[fileSrc]
  }
  const isExists = fs.existsSync(fileSrc)

  if (isExists) {
    fileMap[fileSrc] = require(fileSrc)
    return fileMap[fileSrc]
  }
  return null
}
