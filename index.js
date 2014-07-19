'use strict';
var path = require('path');
var resolveFrom = require('resolve-from');
var callerPath = require('caller-path');

var clear = module.exports = function (moduleId) {
	if (typeof moduleId !== 'string') {
		throw new TypeError('Expected a string');
	}

	delete require.cache[resolveFrom(path.dirname(callerPath()), moduleId)];
};

clear.all = function () {
	Object.keys(require.cache).forEach(clear);
};
