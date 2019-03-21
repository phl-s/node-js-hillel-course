const minimist = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');

let COLOR = minimist.color;

console.log(minimist);
if (minimist.bg) {
  COLOR = ['bg' + COLOR.charAt(0).toUpperCase() + COLOR.slice(1)];
}
console.log(COLOR);
const joinArguments = (...args) => args.join(chalk[COLOR](' -> '));

// console.log(parseArgs);
module.exports = joinArguments;
