const path = require('path');
const EventEmitter = require('events');

const { bindAll, awaitPromisify } = require('../helpers');
// const outputPath = pathNormalize(_output);

const { loggerEvents } = require('../constants');
const { FILES_CONTENT_LOGGED, FILE_READING, FILE_LOGGED, DIR_LOGGED, ERROR } = loggerEvents;

class FilesLogger extends EventEmitter {
  constructor(writter, formatter, eventNames) {
    super();
    this.events = eventNames;
    this.writter = writter;

    this.formatter = formatter;

    bindAll(this, this.init, this.logFile, this.logDir, this.complete);

    this.logFile = awaitPromisify(this.logFile);
    this.logDir = awaitPromisify(this.logDir);
  }

  init() {
    this.on(this.events[ERROR], err => console.log(err));
  }

  complete() {
    this.writter.finishLogging();
  }

  parsePath(_path) {
    this.parsed = path.parse(_path);
  }

  async logFile(_path) {
    this.parsePath(_path);
    this.writter.writeFileName(this.formatter.withPrefix(this.parsed.base));

    if (this.parsed.ext === '.txt') {
      try {
        this.emit(this.events[FILE_READING]);

        await this.writter.writeFileContent(_path);

        this.emit(this.events[FILES_CONTENT_LOGGED]);
      } catch (err) {
        this.emit(this.events[ERROR], err);
      }
    }
    this.emit(this.events[FILE_LOGGED]);
  }

  logDir(_path) {
    this.parsePath(_path);
    this.writter.writeFileName(this.formatter.withPrefix(this.parsed.base));
    this.emit(this.events[DIR_LOGGED]);
  }
}

module.exports = FilesLogger;
