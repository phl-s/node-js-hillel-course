const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const { bindAll, awaitPromisify } = require('../helpers');
// const outputPath = pathNormalize(_output);

const { parserEvents, loggerEvents } = require('../constants');
const { IS_FILE, IS_DIR, START, END } = parserEvents;
const { WRITTEN } = loggerEvents;

class FilesLogger extends EventEmitter {
  constructor(logWriter, formatter, eventNames) {
    super();
    this.events = eventNames;
    this.logWriter = logWriter;
    this.formatter = formatter;
    bindAll(this, this.logFile, this.logDir);

    this.logFile = awaitPromisify(this.logFile);
  }

  emit(event, ...args) {
    super.emit(event, ...args);
  }

  parsePath(_path) {
    this.parsed = path.parse(_path);
  }

  async logFile(_path) {
    this.parsePath(_path);
    this.logWriter.writeFileName(this.formatter.withPrefix(this.parsed.base));

    if (this.parsed.ext === '.txt') {
      this.emit('FILE_READING');
      await this.logWriter.writeFileContent(_path);
      this.emit('FILE_CONTENT_LOGGED');
    }
    this.emit('FILE_LOGGED');
  }

  logDir(_path) {
    this.parsePath(_path);
    this.logWriter.writeFileName(this.formatter.withPrefix(this.parsed.base));
    this.emit('DIR_LOGGED');
  }
}

module.exports = FilesLogger;
