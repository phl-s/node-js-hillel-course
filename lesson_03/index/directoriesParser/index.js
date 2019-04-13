const fs = require('fs');
const pathNormalize = require('../pathNormalise');
const DirectoriesParser = require('./parser');
const Formatter = require('./formatter');
const WriteLogsToFile = require('./writeLogToFile');
const FilesLogger = require('./logger');

const { awaitPromisify } = require('../helpers');

const { parserEvents, loggerEvents } = require('../constants');
const { IS_FILE, IS_DIR, START, END } = parserEvents;
const { FILE_READING, FILE_CONTENT_LOGGED } = loggerEvents;

const writable = fs.createWriteStream('./log.txt', { flags: 'a' });

const formatter = new Formatter('-', '*');
const parser = new DirectoriesParser(parserEvents);
const logger = new FilesLogger(new WriteLogsToFile(writable, 100), formatter, loggerEvents);

parser.on(START, formatter.increment);
parser.on(END, formatter.decrement);
parser.on(IS_FILE, awaitPromisify(logger.logFile));
parser.on(IS_DIR, awaitPromisify(logger.logDir));

logger.on(FILE_READING, parser.pause);
logger.on(FILE_CONTENT_LOGGED, parser.resume);

module.exports = parser;
