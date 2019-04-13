const { i, o, d } = require('minimist')(process.argv.slice(2));
const pathNormalise = require('./pathNormalise');
const parserInit = require('./directoriesParser');

const inputPath = pathNormalise(i);
const pareser = parserInit(o, d);

pareser.parse(inputPath);
