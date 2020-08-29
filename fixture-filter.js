'use strict';

const x = require('parent-module');
const fixture = require('./fixture');

module.exports = () => fixture();
module.exports.x = x;
