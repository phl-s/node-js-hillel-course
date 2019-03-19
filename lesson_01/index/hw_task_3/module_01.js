var parseArgs = require('minimist')(process.argv.slice(2));

const joinArguments = array => array.join(' -> ');

module.exports = joinArguments;
