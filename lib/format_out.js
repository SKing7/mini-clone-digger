var csv = require('fast-csv');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = { 
    csv: function (data, module, csvPath) { 

        var csvStream = csv.createWriteStream( {headers: true} ),
            writableStream = fs.createWriteStream(path.resolve(__dirname, '..', csvPath, module + '.csv'));

        writableStream.on("finish", function(){
          console.log("DONE!");
        });

        csvStream.pipe(writableStream);

        _.forEach(data, function (v, k) {
            csvStream.write(v);
        });
        csvStream.end();
    }
}
