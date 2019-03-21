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
      if (item === null) {
        return 'null'.red;
        //
      } else if (item === undefined) {
        return 'undefined'.red;
        //
      } else if (item !== item && isNaN(item)) {
        return 'NaN'.red;
        //
      } else if (typeof item === 'function') {
        return item.toString().gray;
        //
      } else if (typeof item === 'string') {
        return item.green;
        //
      } else if (typeof item === 'number') {
        return item.toString().magenta;
        //
      } else if (isPlainObject(item)) {
        return JSON.stringify(item, null, ' ').cyan;
        //
      } else if (Array.isArray(item)) {
        return JSON.stringify(item).cyan;
        //
      } else return item;
    };

    console._log(...args.map(toString));
  };
};
