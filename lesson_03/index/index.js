//Checkout

const { i: inputPath, o: outputPath, d: depth } = require('minimist')(process.argv.slice(2));
const pathNormalise = require('./pathNormalise');
const parserInit = require('./directoriesParser');

if (!!inputPath && !!outputPath) {
  const $inputPath = pathNormalise(inputPath);
  const pareser = parserInit(outputPath, depth);
  pareser.parse($inputPath);
}
