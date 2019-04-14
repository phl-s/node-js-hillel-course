const IS_FILE = 'IS_FILE';
const IS_DIR = 'IS_DIR';
const START = 'START';
const END = 'END';
const PAUSE = 'PAUSE';
const RESUME = 'RESUME';
const ERROR = 'ERROR';
const FINISH = 'FINISH';

const FILE_READING = 'FILE_READING';
const FILE_LOGGED = 'FILE_LOGGED';
const DIR_LOGGED = 'DIR_LOGGED';
const FILES_CONTENT_LOGGED = 'FILE_CONTENT_LOGGED';

const parserEvents = Object.freeze({
  IS_FILE,
  IS_DIR,
  START,
  END,
  PAUSE,
  RESUME,
  ERROR,
  FINISH,
});

const loggerEvents = Object.freeze({
  FILE_READING,
  FILES_CONTENT_LOGGED,
  FILE_LOGGED,
  DIR_LOGGED,
  ERROR,
});

exports.parserEvents = parserEvents;
exports.loggerEvents = loggerEvents;
