declare const clear: {
	/**
	Clear a module from the [cache](https://nodejs.org/api/modules.html#modules_caching).

	@param moduleId - What you would use with `require()`.

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
	(moduleId: string): void;

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
	Clear one module from cache non-recursively. No parent or child modules should be affected.
	Relevant for systems with a state that's dependant on Singelton pattern. When user would want to clear a specific module from memory without it having any "side effects" such as clearing a child module from memory as well.
	@param moduleId - What you would use with `require()`.

	@example
	In the following example, `stats` module will **not** be cleared from memory

	**some-application-route.js**
	```js
	const stats = require('stats');
	module.exports = () => {...}
	```

	**code manager**
	```js
	clearModule.single('some-application-route');
	```
	*/
	single(moduleId: string): void;
};

export = clear;
