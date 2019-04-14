const path = require('path');

const root = path.join(__dirname, '..');

const pathNormalise = _path => {
  if (typeof _path !== 'string') throw new Error('path is not valid');
  _path = path.normalize(_path);
  _path = path.join(root, _path);

  return _path;
};

module.exports = pathNormalise;

// if (path.isAbsolute(_path)) // _path = path.relative(root, _path);
