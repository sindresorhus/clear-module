# clear-require [![Build Status](https://travis-ci.org/sindresorhus/clear-require.svg?branch=master)](https://travis-ci.org/sindresorhus/clear-require)

> Clear a module from the [require cache](http://nodejs.org/api/modules.html#modules_caching)

Useful for testing purposes when you need to freshly require a module.


## Install

```sh
$ npm install --save clear-require
```


## Usage

```js
// foo.js
var i = 0;
module.exports = function () {
	return ++i;
};
```

```js
var clearRequire = require('clear-require');

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

Clear a module from the require cache.

#### moduleId

*Required*  
Type: `string`

What you would put into `require()`.

### clearRequire.all()

Clear all modules from the require cache.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
