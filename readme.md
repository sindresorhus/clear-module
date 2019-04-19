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

Also clean all module's dependencies from cache
```js
clearModule('./foo', true);
```


## API

### clearModule(moduleId, [recursive=false])

#### moduleId

Type: `string`

What you would use with `require()`.

#### recursive

Type: `boolean`

Clear all module dependencies as well (defaults to `false`)

### clearModule.all()

Clear all modules from the cache.

### clearModule.match(regex)

Clear all matching modules from the cache.

#### regex

Type: `RegExp`

Regex to match against the module IDs.


### clearModule.recursive(moduleId)

Clear all matching modules from the cache including all module dependencies.

#### moduleId

Type: `string`

What you would use with `require()`.


## Related

- [import-fresh](https://github.com/sindresorhus/import-fresh) - Import a module while bypassing the cache
- [import-from](https://github.com/sindresorhus/import-from) - Import a module from a given path
- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import a module lazily


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
