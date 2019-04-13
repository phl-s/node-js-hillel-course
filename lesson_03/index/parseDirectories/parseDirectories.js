//TODO create riddble stream
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const pathString = './index/fs-test';
let prefix = '';

async function parseDirectory(_path, callBack) {
  //
  return new Promise(async (resolve, reject) => {
    const files = await readdir(_path, { withFileTypes: true });

    for await (const dirent of files) {
      _pathTo = path.join(_path, dirent.name);

      if (dirent.isDirectory()) {
        await callBack(prefix, dirent, _pathTo);
        prefix += '**';
        await parseDirectory(_pathTo, callBack);
      } else if (dirent.isFile()) {
        await callBack(prefix, dirent, _pathTo);
      }
    }
    resolve();
    if (prefix.length > 0) prefix = prefix.slice(2);
  });
}

module.exports = parseDirectory;
