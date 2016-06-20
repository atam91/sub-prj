#!/bin/node
const fs = require('fs');
const { getIncreased } = require('./utils');

const current = getIncreased('./version');

fs.writeFileSync('./run', 0);

console.log('new version:', current);