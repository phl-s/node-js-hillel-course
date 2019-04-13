const fs = require('fs');
const { bindAll } = require('../helpers');

const Formatter = require('./formatter');

const formatter = new Formatter();

class WriteLogsToFile {
  constructor(outputStream, contentLength) {
    this.outputStream = outputStream;
    this.contentLength = contentLength;

    bindAll(
      this,
      this.onDataHandler,
      this.onEndHandler,
      this.onErrorHandler,
      this.writeFileContent,
      this.finishLogging
    );
  }

  finishLogging() {
    this.outputStream.write('Complete');
  }

  onErrorHandler(err) {
    throw new Error(err);
  }

  onDataHandler(chunk) {
    this.readable.emit('end', chunk);
  }

  onEndHandler(data) {
    if (data) {
      this.outputStream.write(formatter.fileContent(data));
      this.resolve();
    }
  }

  writeFileName(name) {
    this.outputStream.write(name);
  }

  writeFileContent(_path) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.readable = fs.createReadStream(_path, {
        encoding: 'utf-8',
        highWaterMark: this.contentLength,
      });

      this.readable.on('error', this.onErrorHandler);
      this.readable.on('end', this.onEndHandler);
      this.readable.once('data', this.onDataHandler);
    });
  }
}

module.exports = WriteLogsToFile;
