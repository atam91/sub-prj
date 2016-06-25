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

const getIndex = (list, cond) => (
  list.reduce(
    (prev, item, index) => {
      if (prev === -1 && cond(item)) {
        return index;
      }
      return prev;
    },
    -1
  )
);

export {
  date,
  forEachKey,
  objectFilterKey,
  notFilter,
  getIndex
}