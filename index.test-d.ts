import clear = require('.');

clear('my-module');
clear('my-module', true);
clear.all();
clear.match(/^.*$/);
clear.recursive('my-module');
