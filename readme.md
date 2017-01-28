# clear-require [![Build Status](https://travis-ci.org/sindresorhus/clear-require.svg?branch=master)](https://travis-ci.org/sindresorhus/clear-require)

> Clear a module from the [`require` cache](https://nodejs.org/api/modules.html#modules_caching)

Useful for testing purposes when you need to freshly `require` a module.


## Install

```
$ npm install --save clear-require
```


## Usage

```js
// foo.js
let i = 0;
module.exports = () => ++i;
```

```js
const clearRequire = require('clear-require');

require('./foo')();
//=> 1

require('./foo')();
//=> 2

clearRequire('./foo');

require('./foo')();
//=> 1
```


## API

### clearRequire(moduleId)

#### moduleId

Type: `string`

What you would use with `require()`.

### clearRequire.all()

Clear all modules from the `require` cache.

### clearRequire.match(regex)

Clear all matching modules from the `require` cache.

#### regex

Type: `RegExp`

Regex to match against the module ID's.


## Related

- [require-uncached](https://github.com/sindresorhus/require-uncached) - Require a module bypassing the cache


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
