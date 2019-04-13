exports.bindAll = (ctxObject, ...callbacks) => {
  callbacks.forEach(cb => {
    ctxObject[cb.name] = ctxObject[cb.name].bind(ctxObject);
  });
};

//helpers
exports.awaitPromisify = callback => (...args) =>
  new Promise(async (resolve, reject) => {
    try {
      await callback(...args);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
