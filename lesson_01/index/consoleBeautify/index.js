const colors = require('colors');
const isPlainObject = require('is-plain-object');

module.exports = () => {
  if (console._log) {
    console.log = console._log;
    return;
  }
  console._log = console.log;
  console.log = (...args) => {
    const toString = item => {
      let result;

      if (item === null) {
        result = 'null'.red;
        //
      } else if (item === undefined) {
        result = 'undefined'.red;
        //
      } else if (item !== item && isNaN(item)) {
        result = 'NaN'.red;
        //
      } else if (typeof item === 'function') {
        result = item.toString().gray;
        //
      } else if (typeof item === 'string') {
        result = item.green;
        //
      } else if (typeof item === 'number') {
        result = item.toString().magenta;
        //
      } else if (isPlainObject(item)) {
        result = JSON.stringify(item, null, ' ').cyan;
        //
      } else if (Array.isArray(item)) {
        result = JSON.stringify(item).cyan;
        //
      } else result = item;

      return result + '\n';
    };
    args = args.map(toString);
    console._log('\n', ...args);
  };
};
