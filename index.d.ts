interface Options {
	/**
	Optional filter function, function should return false to prevent the module from being removed from cache.

	@default undefined
	*/
	readonly filter?: (fullPath: string) => boolean
}

declare const clear: {
	/**
	Clear a module from the [cache](https://nodejs.org/api/modules.html#modules_caching).

	@param moduleId - What you would use with `require()`.
	@param options - Options

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
	(moduleId: string, options?: Options): void;

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
	Clear a single module from the cache non-recursively. No parent or children modules will be affected.

	This is mostly only useful if you use singletons, where you would want to clear a specific module without causing any side effects.

	@param moduleId - What you would use with `require()`.
	*/
	single(moduleId: string): void;
};

export = clear;
