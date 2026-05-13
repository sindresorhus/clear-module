import fs from 'fs';
import path from 'path';
import test from 'ava';
import clearModule from '.';

const nativeModulePath = path.join(process.cwd(), '.ai-temporary', 'fixture-native.node');

const nonNativeModuleIds = () => Object.keys(require.cache).filter(moduleId => path.extname(moduleId) !== '.node');

const seedNativeModule = () => {
	if (!fs.existsSync(path.dirname(nativeModulePath))) {
		fs.mkdirSync(path.dirname(nativeModulePath));
	}

	fs.writeFileSync(nativeModulePath, '');

	const nativeModule = {
		id: nativeModulePath,
		filename: nativeModulePath,
		loaded: true,
		exports: {},
		children: [],
		parent: module
	};

	require.cache[nativeModulePath] = nativeModule;

	return nativeModule;
};

const clearNativeModule = () => {
	delete require.cache[nativeModulePath];

	if (fs.existsSync(nativeModulePath)) {
		fs.unlinkSync(nativeModulePath);
	}
};

test.after.always(clearNativeModule);

test('clearModule()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	clearModule(id);
	t.is(require(id)(), 1);
});

test('clearModule.all()', t => {
	t.true(nonNativeModuleIds().length > 0);
	clearModule.all();
	t.is(nonNativeModuleIds().length, 0);
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

test('clearModule() recursively, multiple imports', t => {
	clearModule.all();
	const id = './fixture-with-dependency';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
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

test.serial('native modules are not cleared', t => {
	try {
		let nativeModule = seedNativeModule();
		clearModule(nativeModulePath);
		t.is(require.cache[nativeModulePath], nativeModule);

		nativeModule = seedNativeModule();
		clearModule.single(nativeModulePath);
		t.is(require.cache[nativeModulePath], nativeModule);

		nativeModule = seedNativeModule();
		clearModule.all();
		t.is(require.cache[nativeModulePath], nativeModule);

		nativeModule = seedNativeModule();
		clearModule.match(/fixture-native/);
		t.is(require.cache[nativeModulePath], nativeModule);

		const id = './fixture';
		require(id);
		const fixtureModule = require.cache[require.resolve(id)];
		nativeModule = seedNativeModule();
		fixtureModule.children.push(nativeModule);
		clearModule(id);
		t.is(require.cache[nativeModulePath], nativeModule);
	} finally {
		clearNativeModule();
	}
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
