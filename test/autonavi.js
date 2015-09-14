var task = require('../lib/task');
var _ = require('lodash');
var out = require('../lib/format_out');
var argv = require('optimist').argv;
var recursive = require('recursive-readdir');
var async = require('async');
var instance = task(argv.p);

var module = argv.m || 'order';
var basePath = argv.p;
recursive(basePath + '/' + module, function (err, files) {

    instance.main(files, function (rate) {
        var tmp,
            keys = [];

        //生成简短的key
        _.forEach(files, function (v, k) {
            tmp  = v.substr(basePath.length + module.length + 2)
            tmp = tmp.substring(0, tmp.lastIndexOf('.'));
            keys[k] = tmp;
        });

        //筛选rate
        _.forEach(rate, function (v) {
            _.forEach(v, function (v1, i) {
                if (v1 < 0.5 || v1 === undefined) {
                    delete v[i];
                }
            });
        });
        //每一行增加key名
        _.forEach(rate, function (v, k) {
            rate[k] = [keys[k]].concat(v);
        });

        //增加第一列
        keys = ['模板:' + module].concat(keys);

        var data = [keys].concat(rate);
        //删除空行
        removeEmptyRow(data);
        //删除空列
        data = row2col(data);
        removeEmptyRow(data);
        data = row2col(data);
        data = _.compact(data);
        out.csv(data, module, 'build');
    });
    function removeEmptyRow(data) {
        _.forEach(data, function (v, k) {
            var isEmptyRow = true;
            if (k > 0) {
                _.forEach(v, function (v1, k1) {
                    if (k1 > 0) {
                        if (v1) {
                            isEmptyRow = false;
                        }
                    }
                });
                if (isEmptyRow) {
                    delete data[k];
                }
            }
        });
    }
    function row2col(data) {
        var tmp;
        var rt = [];
        _.forEach(data, function (v, k) {
            _.forEach(v, function (v1, k1) {
                rt[k1] = rt[k1] || [];
                rt[k1].push(v1);
            });
        });
        return rt
    }
});
