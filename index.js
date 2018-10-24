'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const callerPath = require('caller-path');

const clear = (moduleId, options) => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

    if (typeof options !== 'object') {
        throw new TypeError(`Expected an \`object\`, got \`${typeof options}\``);
    }

	const filePath = resolveFrom(path.dirname(callerPath()), moduleId);

    // Delete its children from module
    if (options.children && require.cache[filePath] && require.cache[filePath].children) {
        let i = require.cache[filePath].children.length;

		while (i--) {
            delete require.cache[require.cache[filePath].children[i].id];
		}
    }

	// Delete itself from module parent
	if (require.cache[filePath] && require.cache[filePath].parent) {
		let i = require.cache[filePath].parent.children.length;

		while (i--) {
			if (require.cache[filePath].parent.children[i].id === filePath) {
				require.cache[filePath].parent.children.splice(i, 1);
			}
		}
	}

	// Delete module from cache
	delete require.cache[filePath];
};

clear.all = () => {
	for (const moduleId of Object.keys(require.cache)) {
		clear(moduleId);
	}
};

clear.match = (regex, options) => {
	for (const moduleId of Object.keys(require.cache)) {
		if (regex.test(moduleId)) {
			clear(moduleId, options);
		}
	}
};

module.exports = clear;
