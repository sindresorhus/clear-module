'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const parentModule = require('parent-module');

const resolve = moduleId => {
	try {
		return resolveFrom(path.dirname(parentModule(__filename)), moduleId);
	} catch (error) {
		return undefined;
	}
};

const clear = moduleId => {
	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
	}

	const filePath = resolve(moduleId);

	if (!filePath) {
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
		require.cache[filePath].children.forEach(({id}) => clear(id, true));
	}

	// Delete module from cache
	delete require.cache[filePath];
};

clear.all = () => {
	const dir = path.dirname(parentModule(__filename));

	for (const moduleId of Object.keys(require.cache)) {
		delete require.cache[resolveFrom(dir, moduleId)];
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
