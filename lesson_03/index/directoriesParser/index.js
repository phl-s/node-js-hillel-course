const pathNormalize = require('../pathNormalise');
const DirectoriesParser = require('./parser');
const Formatter = require('./formatter');
const WriteLogsToFile = require('./writeLogToFile');
const FilesLogger = require('./logger');

const { awaitPromisify } = require('../helpers');

const { parserEvents, loggerEvents } = require('../constants');
const { IS_FILE, IS_DIR, START, END, FINISH } = parserEvents;
const { FILE_READING, FILE_CONTENT_LOGGED } = loggerEvents;

const parserInit = (outputPath, depth) => {
  //
  outputPath = pathNormalize(outputPath);

  const formatter = new Formatter(' ', '*');
  const writer = new WriteLogsToFile(outputPath, 100, formatter);
  const logger = new FilesLogger(writer, formatter, loggerEvents);
  const parser = new DirectoriesParser(parserEvents, depth);

  parser.on(START, formatter.increment);
  parser.on(END, formatter.decrement);
  parser.on(IS_FILE, awaitPromisify(logger.logFile));
  parser.on(IS_DIR, awaitPromisify(logger.logDir));
  parser.on(FINISH, logger.complete);

  logger.on(FILE_READING, parser.pause);
  logger.on(FILE_CONTENT_LOGGED, parser.resume);

  return parser;
};

module.exports = parserInit;
