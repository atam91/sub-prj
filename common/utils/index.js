const date = () => {
  return new Date().toJSON();
};

const forEachKey = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key])
  });
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

const all = (list, cond) => list.reduce(
  (prev, item) => prev && cond(item),
  true
);

export {
  all,
  date,
  forEachKey,
  objectFilterKey,
  notFilter
}