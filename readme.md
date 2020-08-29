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

### clearModule(moduleId, options)

#### moduleId

Type: `string`

What you would use with `require()`.

#### options

Type: `object`

##### options.filter

Optional callback to filter with, must return false to not clear. Passes in the full path to the module. Will not process child modules of modules that are filtered out.

Use case

This allows you to prevent specific submodules from being unloaded, i.e. aws-sdk, if used in main code, but you have it in modules that are being cleared out, this could adversely affect code that is not being cleared. You could also, prevent anything from node_modules from being unloaded as well, fp => !fp.match(/node_modules/). For users, this will only unload user code and not package code.

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
