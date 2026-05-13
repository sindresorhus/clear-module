'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const parentModule = require('parent-module');

const resolve = moduleId => {
	try {
		return resolveFrom(path.dirname(parentModule(__filename)), moduleId);
	} catch (_) {}
};

const isNativeModule = filePath => path.extname(filePath) === '.node';

const clear = moduleId => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

	const filePath = resolve(moduleId);

	if (!filePath) {
		return;
	}

	if (isNativeModule(filePath)) {
		return;
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

	// Remove all descendants from cache as well
	if (require.cache[filePath]) {
		const children = require.cache[filePath].children.map(child => child.id);

		// Delete module from cache
		delete require.cache[filePath];

		for (const id of children) {
			clear(id);
		}
	}
};

clear.all = () => {
	for (const filePath of Object.keys(require.cache)) {
		if (!isNativeModule(filePath)) {
			delete require.cache[filePath];
		}
	}
};

clear.match = regex => {
	for (const moduleId of Object.keys(require.cache)) {
		if (regex.test(moduleId)) {
			clear(moduleId);
		}
	}
};

clear.single = moduleId => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

	const filePath = resolve(moduleId);

	if (!filePath || isNativeModule(filePath)) {
		return;
	}

	delete require.cache[filePath];
};

module.exports = clear;
