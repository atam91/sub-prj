const fs = require('fs');
const { getFromFile, getIncreased } = require('./utils');

const currentVersion = getFromFile('./version/version');
const currentRun = getIncreased('./version/run');

module.exports = currentVersion + '-' + currentRun;