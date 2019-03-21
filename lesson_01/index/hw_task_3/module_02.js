const yargs = require('yargs');
const colors = require('colors');

const COLOR = yargs.argv.color || 'green';

exports.joinArguments = (...args) => args.join(colors[COLOR](' -> '));
