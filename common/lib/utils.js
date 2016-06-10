const forEachKey = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key])
  });
};

const action = (type, payload = null) => {
  return { type, payload };
};

const date = () => {
  return new Date().toJSON();
};

module.exports = {
  forEachKey,
  action,
  date
};