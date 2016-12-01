'use strict';
var test = require('ava');
var clearRequire = require('./');

test('clearRequire()', function (t) {
	var id = './fixture';
	t.assert(require(id)() === 1);
	t.assert(require(id)() === 2);
	clearRequire(id);
	t.assert(require(id)() === 1);
});

test('clearRequire.all()', function (t) {
	t.assert(Object.keys(require.cache).length > 0);
	clearRequire.all();
	t.assert(Object.keys(require.cache).length === 0);
});

test('clearRequire.require()', function (t) {
	var id = './fixture';
	t.assert(require(id)() === 1);
	t.assert(require(id)() === 2);
	t.assert(clearRequire.require(id)() === 1);
	t.assert(Object.keys(require.cache).length === 0);
	t.assert(require(id)() === 1);
});
