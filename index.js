'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const callerPath = require('caller-path');

const clear = moduleId => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

	delete require.cache[resolveFrom(path.dirname(callerPath()), moduleId)];
};

clear.all = () => {
	for (const moduleId of Object.keys(require.cache)) {
		clear(moduleId);
	}
};

clear.match = regex => {
	for (const moduleId of Object.keys(require.cache)) {
		if (regex.test(moduleId)) {
			clear(moduleId);
		}
	}
};

module.exports = clear;
