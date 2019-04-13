const { bindAll } = require('../helpers');

class Formatter {
  constructor(symbols, defaultValue = '') {
    this.value = '';
    this.defaultValue = defaultValue;
    this.symbols = symbols;
    this.sep = ' ';
    bindAll(this, this.increment, this.decrement, this.withPrefix);
  }
  withPrefix(str) {
    if (this.value.length === 0) return this.defaultValue + this.sep + str + '\n';
    return this.defaultValue + this.sep + this.value + this.sep + str + '\n';
  }
  fileContent(str) {
    return `\n<--\n${str}\n-->\n`;
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
