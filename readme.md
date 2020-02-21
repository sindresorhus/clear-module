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

### clearModule(moduleId)

#### moduleId

Type: `string`

What you would use with `require()`.

### clearModule.all()

Clear all modules from the cache.

### clearModule.match(regex)

Clear all matching modules from the cache.

#### regex

Type: `RegExp`

Regex to match against the module IDs.

### clearModule.single(moduleId)

Clear one module from cache non-recursively. No parent or child modules should be affected

<details>
<summary>Example use</summary>
Relevant for systems with a state that's dependant on Singelton pattern. When user would want to clear a specific module from memory without it having any "side effects" such as clearing a child module from memory as well.

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
</details>

#### moduleId

Type: `string`

What you would use with `require()`.

## Related

- [import-fresh](https://github.com/sindresorhus/import-fresh) - Import a module while bypassing the cache
- [import-from](https://github.com/sindresorhus/import-from) - Import a module from a given path
- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import a module lazily
