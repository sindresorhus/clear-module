import clear = require('.');

clear('my-module');
clear('my-module', {recursive: false});
clear.all();
clear.match(/^.*$/);
