const isEmptyArray = array => array.length === 0;

const isFullArray = (array, length) => array.length >= length;

module.exports = {
  isEmptyArray,
  isFullArray,
};
