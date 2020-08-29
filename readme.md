# clear-module [![Build Status](https://travis-ci.org/sindresorhus/clear-module.svg?branch=master)](https://travis-ci.org/sindresorhus/clear-module)

> Clear a module from the [cache](https://nodejs.org/api/modules.html#modules_caching)

Useful for testing purposes when you need to freshly import a module.

## Install

```
$ npm install clear-module
```

## Usage

```js
// foo.js
let i = 0;
module.exports = () => ++i;
```

```js
const clearModule = require('clear-module');

require('./foo')();
//=> 1

require('./foo')();
//=> 2

clearModule('./foo');

require('./foo')();
//=> 1
```

## API

### clearModule(moduleId, callback)

#### moduleId

Type: `string`

What you would use with `require()`.

#### callback

Type: `function`

Optional callback to filter with, must return false to not clear.
Passes in the moduleId and full path to the function.
Will not process child modules of modules that are filtered out.

### clearModule.all()

Clear all modules from the cache.

### clearModule.match(regex)

Clear all matching modules from the cache.

#### regex

Type: `RegExp`

Regex to match against the module IDs.

### clearModule.single(moduleId)

Clear a single module from the cache non-recursively. No parent or children modules will be affected.

This is mostly only useful if you use singletons, where you would want to clear a specific module without causing any side effects.

#### moduleId

Type: `string`

What you would use with `require()`.

## Related

- [import-fresh](https://github.com/sindresorhus/import-fresh) - Import a module while bypassing the cache
- [import-from](https://github.com/sindresorhus/import-from) - Import a module from a given path
- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import a module lazily
