'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const callerPath = require('caller-path');

const clear = (moduleId, options = {}) => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

	if (typeof options !== 'object') {
		throw new TypeError(`Expected an \`object\`, got \`${typeof options}\``);
	}

	const filePath = resolveFrom(path.dirname(callerPath()), moduleId);

	// Delete its descendants from module
	if (options.children && require.cache[filePath] && require.cache[filePath].children) {
		let parent = require.cache[filePath];

		while (parent.id !== filePath || (parent.children && parent.children.length)) {
			while (parent.children.length && parent.children[0].children.length && typeof parent.children[0].children[0] !== 'undefined') {
				parent = parent.children[0];
			}
			delete require.cache[parent.children[0].id];
			parent.children = parent.children.slice(1);
			if (parent.children.length === 0 && parent.id !== filePath) {
				parent = parent.parent;
			}
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
