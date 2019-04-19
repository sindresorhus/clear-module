import test from 'ava';
import clearModule from '.';

test('clearModule()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	clearModule(id);
	t.is(require(id)(), 1);
});

test('clearModule.all()', t => {
	t.true(Object.keys(require.cache).length > 0);
	clearModule.all();
	t.is(Object.keys(require.cache).length, 0);
});

test('clearModule.match()', t => {
	const id = './fixture';
	const match = './fixture-match';
	t.is(require(id)(), 1);
	t.is(require(match)(), 1);
	clearModule.match(/match/);
	t.is(require(id)(), 2);
	t.is(require(match)(), 1);
});

test('clearModule() with recursive flag', t => {
	const id = './fixture-with-dependency';
	clearModule(id);
	clearModule('./fixture');
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	clearModule(id);
	t.is(require(id)(), 3);
	clearModule(id, true);
	t.is(require(id)(), 1);
});

test('clearModule.recursive()', t => {
	const id = './fixture-with-dependency';
	clearModule(id);
	const {recursive: clear} = clearModule;
	clearModule('./fixture');
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	clearModule(id);
	t.is(require(id)(), 3);
	clear(id);
	t.is(require(id)(), 1);
});
