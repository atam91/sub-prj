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

const objectFilterKey = (obj, filter) => {
  return Object.keys(obj)
    .filter(filter)
    .reduce((prev, key) => (
      Object.assign(prev, { [key]: obj[key] })
    ), {});
};

const notFilter = ( ...args ) => 
  (item) => (args.indexOf(item) === -1);

export {
  forEachKey,
  action,
  date,
  objectFilterKey,
  notFilter
}