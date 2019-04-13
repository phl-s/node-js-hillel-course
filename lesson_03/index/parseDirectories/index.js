//TODO create riddble stream
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const parseDirectories = require('./parseDirectories');
const pathNormalize = require('../pathNormalise');

const _output = path.join('fs-test', '2.txt');

const testPath = pathNormalize('fs-test');
const outputPath = pathNormalize(_output);

const writable = fs.createWriteStream(outputPath, { flags: 'a' });

function readTxtFile(_path) {
  return new Promise((resolve, reject) => {
    let str = '';

    const readable = fs.createReadStream(_path, {
      encoding: 'utf-8',
      highWaterMark: 100,
    });

    readable.on('end', () => {
      // writable.write(str);
      console.log(str);
      resolve();
    });

    readable.once('data', chunk => {
      str = chunk;
      readable.emit('end');
    });
  });
}

async function logParsedDirectories(prefix, dirent, _path) {
  return new Promise(async (resolve, reject) => {
    console.log(prefix, dirent.name);
    const str = `${prefix} ${dirent.name} \n`;
    if (_path === outputPath) {
      console.log('OUTPUT');
      // writable.write('\n' + '====' + '\n' + str + '====' + '\n');
      resolve();
    } else if (dirent.isFile() && path.extname(dirent.name) === '.txt') {
      // writable.write(str);
      await readTxtFile(_path);
      resolve();
    } else {
      // writable.write(str);
      resolve();
    }
  });
}

parseDirectories(testPath, logParsedDirectories);
