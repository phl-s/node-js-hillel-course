//TODO create riddble stream
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const pathString = './index/fs-test';
let prefix = '';

async function parseDirectory(_path) {
  //
  return new Promise(async (resolve, reject) => {
    const files = await readdir(_path, { withFileTypes: true });

    for await (const fileDirent of files) {
      _path = path.join(_path, fileDirent.name);

      if (fileDirent.isDirectory()) {
        console.log(prefix, fileDirent.name, 'DIR');
        prefix += '  ';
        await parseDirectory(_path);
      } else if (fileDirent.isFile()) {
        console.log(prefix, fileDirent.name, 'FILE');
      }
    }
    resolve();
    if (prefix.length > 0) prefix = prefix.slice(2);
  });
}

parseDirectory(pathString);
