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

test('clearModule() recursively', t => {
	clearModule.all();
	const id = './fixture-with-dependency';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	delete require.cache[require.resolve(id)];
	t.is(require(id)(), 3);
	clearModule(id);
	t.is(require(id)(), 1);
});

test('clearModule.single()', t => {
	clearModule.all();
	const id = './fixture-with-dependency';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	clearModule.single(id);
	t.is(require(id)(), 3);
	clearModule(id);
	t.is(require(id)(), 1);
});

test('works with circular dependencies', t => {
	const id1 = './fixture-circular-1';
	require(id1);

	let parentCalls = 0;
	let childrenCalls = 0;

	const {children, parents} = require.cache[require.resolve(id1)];

	Object.defineProperty(
		require.cache[require.resolve(id1)],
		'children',
		{
			get: () => {
				childrenCalls++;
				return children;
			}
		}
	);

	Object.defineProperty(
		require.cache[require.resolve(id1)],
		'parent',
		{
			get: () => {
				parentCalls++;
				return parents;
			}
		}
	);

	clearModule(id1);
	t.is(parentCalls, 1);
	t.is(childrenCalls, 4);
	clearModule.all();
});
