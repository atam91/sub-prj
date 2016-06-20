const fs = require('fs');

const getFromFile = (name) => {
  let result;

  try {
    if (fs.statSync(name).isFile()) {
      result = parseInt(fs.readFileSync(name).toString());
    }
  } catch (e) { /*_*/ }

  return result || 0;
};

const getIncreased = (name) => {
  const increased = 1 + getFromFile(name);
  
  fs.writeFileSync(name, increased);

  return increased;
};

module.exports = { getFromFile, getIncreased };