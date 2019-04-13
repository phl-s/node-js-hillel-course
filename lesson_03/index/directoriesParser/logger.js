const path = require('path');
const EventEmitter = require('events');

const { bindAll, awaitPromisify } = require('../helpers');
// const outputPath = pathNormalize(_output);

const { loggerEvents } = require('../constants');
const { FILES_CONTENT_LOGGED, FILE_READING, FILE_LOGGED, DIR_LOGGED, ERROR } = loggerEvents;

class FilesLogger extends EventEmitter {
  constructor(logWriter, formatter, eventNames) {
    super();
    this.events = eventNames;
    this.logWriter = logWriter;
    this.formatter = formatter;
    bindAll(this, this.init, this.logFile, this.logDir, this.complete);

    this.logFile = awaitPromisify(this.logFile);
  }
  init() {
    this.on(this.events[ERROR], err => console.log(err));
  }

  complete() {
    this.logWriter.finishLogging();
  }

  parsePath(_path) {
    this.parsed = path.parse(_path);
  }

  async logFile(_path) {
    this.parsePath(_path);
    this.logWriter.writeFileName(this.formatter.withPrefix(this.parsed.base));

    if (this.parsed.ext === '.txt') {
      try {
        this.emit(this.events[FILE_READING]);
        await this.logWriter.writeFileContent(_path);
        this.emit(this.events[FILES_CONTENT_LOGGED]);
      } catch (err) {
        this.emit(this.events[ERROR], err);
      }
    }
    this.emit(this.events[FILE_LOGGED]);
  }

  logDir(_path) {
    this.parsePath(_path);
    this.logWriter.writeFileName(this.formatter.withPrefix(this.parsed.base));
    this.emit(this.events[DIR_LOGGED]);
  }
}

module.exports = FilesLogger;
