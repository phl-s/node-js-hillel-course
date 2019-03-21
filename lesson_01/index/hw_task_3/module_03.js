const commander = require('commander');
const consoleBeautify = require('../consoleBeautify');

commander
  .version('0.1.0')
  .option('--console-beautify')
  .parse(process.argv);

if (commander.consoleBeautify) {
  consoleBeautify();
}

module.exports.joinArguments = (...args) => args.join(' -> ');
