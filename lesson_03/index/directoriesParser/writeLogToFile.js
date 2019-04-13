const fs = require('fs');
const path = require('path');
const { bindAll } = require('../helpers');

class WriteLogsToFile {
  constructor($path, contentLength, formatter) {
    this.$path = $path;
    this.outputStream = null;
    this.contentLength = contentLength;
    this.formatter = formatter;

    bindAll(
      this,
      this.onDataHandler,
      this.onEndHandler,
      this.onErrorHandler,
      this.writeFileContent,
      this.finishLogging,
      this.createStream
    );

    this.createStream($path);
  }

  createStream($path) {
    this.outputStream = fs.createWriteStream($path, { flags: 'a' });
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
      this.outputStream.write(this.formatter.fileContent(data));
      this.resolve();
    }
  }

  writeFileName(name) {
    this.outputStream.write(name);
  }

  writeFileContent($path) {
    if ($path === this.$path) {
      console.log($path, '\n', this.$path, '\n');
      return;
    }
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.readable = fs.createReadStream($path, {
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
