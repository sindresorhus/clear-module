/* eslint-disable import/no-dynamic-require */
import test from 'ava';
import m from '.';

test('clearRequire()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	m(id);
	t.is(require(id)(), 1);
});

test('clearRequire.all()', t => {
	t.true(Object.keys(require.cache).length > 0);
	m.all();
	t.is(Object.keys(require.cache).length, 0);
});

test('clearRequire.match()', t => {
	const id = './fixture';
	const match = './fixture-match';
	t.is(require(id)(), 1);
	t.is(require(match)(), 1);
	m.match(/match/);
	t.is(require(id)(), 2);
	t.is(require(match)(), 1);
});
