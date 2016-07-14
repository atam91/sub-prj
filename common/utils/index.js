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

const deepCopy = (object) => JSON.parse(JSON.stringify(object));

const deepEqual = (obj1, obj2) => (
  JSON.stringify(obj1) === JSON.stringify(obj2)
);

export {
  date,
  deepCopy,
  deepEqual,
  forEachKey,
  objectFilterKey,
  notFilter,
  getIndex
}