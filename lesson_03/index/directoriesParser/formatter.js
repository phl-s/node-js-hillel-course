const { bindAll } = require('../helpers');

class Formatter {
  constructor(symbols, defaultPrefix = '') {
    this.value = '';
    this.defaultPrefix = defaultPrefix;
    this.symbols = symbols;

    bindAll(this, this.increment, this.decrement, this.withPrefix);
  }
  withPrefix(str) {
    return this.defaultPrefix + this.value + str;
  }
  fileContent(str) {
    return `\n<--\n${str + '...'}\n-->\n`;
  }
  increment() {
    this.value += this.symbols;
  }
  decrement() {
    if (this.value.length > 0) {
      this.value = this.value.slice(this.symbols.length);
    }
  }
}

module.exports = Formatter;
