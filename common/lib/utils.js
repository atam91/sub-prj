const forEachKey = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key])
  });
};

const action = (type, payload = null) => {
  return { type, payload };
};

module.exports = {
  forEachKey,
  action
};