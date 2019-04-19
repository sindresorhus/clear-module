declare const clear: {
	/**
	Clear a module from the [cache](https://nodejs.org/api/modules.html#modules_caching).

	@param moduleId - What you would use with `require()`.
	@param recursive - Clear all module dependencies as well.

	@example
	```
	// foo.ts
	let i = 0;
	module.exports = () => ++i;

	// test.ts
	import clearModule = require('clear-module');

	require('./foo')();
	//=> 1

	require('./foo')();
	//=> 2

	clearModule('./foo');

	require('./foo')();
	//=> 1
	```
	*/
	(moduleId: string, recursive?: boolean): void;

	/**
	Clear all modules from the cache.
	*/
	all(): void;

	/**
	Clear all matching modules from the cache.

	@param regex - Regex to match against the module IDs.
	*/
	match(regex: RegExp): void;


	/**
	Clear a module from cache including its dependencies

	@param moduleId - What you would use with `require()`.
	*/
	recursive(moduleId: string): void;
};

export = clear;
