var task = require('../lib/task');
var argv = require('optimist').argv;
var instance = task(argv.p);

instance.main([
    'navigation/navigation_index_content_bus_walk.html',
    'navigation/navigation_index_content_car.html',
    'navigation/navigation_index_content.html',
], function (rate) {
    console.log(rate);
});
