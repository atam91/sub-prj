const colors = require('colors/safe');
const { date } = require('./utils');

const red = colors.red;
const bold = colors.bold;
const gray = colors.gray;
const reset = colors.reset;

module.exports = (name = '', color = 'white') => {
  const styledName = colors[color](name);

  const log = ( ...args ) => {
    console.log(styledName, gray.bold(date()), ...args);
  };

  const info = ( ...args ) => {
    console.log(styledName, colors.cyan( ...args ));
  };

  const error = ( title = 'ERROR', ...args ) => {
    console.log(styledName, gray.bold(date()), red.bold(title), ...args);
  };

  return { log, info, error, red, bold };
};