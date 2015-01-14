var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var dis = require('./matching_rate');

module.exports = function (basePath) {
    function Task(basePath) {
        this.basePath = basePath;
    }
    Task.prototype.main = function (files, cb) {
        var path = this.basePath;
        var originFiles = files;
        files = resolvePath(path, files);
        var matchRate = []; 
        async.map(files, handleFile, function(err, results){
            _.forEach(results, function (v1, k1) {
                matchRate[k1] = [];
                _.forEach(results, function (v2, k2) {
                    if (k2 <= k1) {
                        matchRate[k1][k2] =  matchRate[k2][k1] || 1;
                    } else {
                        matchRate[k1][k2] = dis(v1, v2);
                    }
                });
            });
            cb(matchRate);
        });
    }

    function handleFile(file, cb) {
        var content = fs.readFileSync(file, 'utf-8'); 
        content = content.replace(/\s+/g, '');
        cb(null, content);
    }
    function resolvePath(basePath, files) {
        var cloned = [];
        _.forEach(files, function (v, k) {
            cloned[k] = path.resolve(basePath, v);
        });
        return cloned;
    }
    return new Task(basePath);
}
