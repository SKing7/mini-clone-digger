var task = require('../lib/task');
var argv = require('optimist').argv;
var recursive = require('recursive-readdir');
var instance = task(argv.p);

recursive(argv.p + '/navigation', function (err, files) {
    instance.main(files, function (rate) {
        console.log(rate);
    });
});
