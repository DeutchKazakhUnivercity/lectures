// This example looks for all files in the current directory
// and search for the files which contains the
// specified text.
// This file wait until all results are reteived.

var fs = require('fs');
var path = require('path');

var textToSearch = 'ne';

function testFileAsync(fileName, callback) {
    fs.lstat(fileName, function (err, stat) {
        if (err) throw err;
        if (stat.isFile()) {
            fs.readFile(fileName, function (err, fileContent) {
                if (err) throw err;
                var fileText = fileContent.toString();
                if (fileText.indexOf(textToSearch) != -1) {
                    callback(fileName, true);
                } else {
                    callback(fileName, false);
                }
            });
        } else {
            callback(fileName, false);
        }
    });
}

function findFilesAsync(callback) {
    var result = [];
    fs.readdir(__dirname, function (err, dirFiles) {
        if (err) throw err;
        var processed = 0;
        for (i = 0; i< dirFiles.length; i++) {
            var fileName = path.resolve(__dirname, dirFiles[i]);
            testFileAsync(fileName, function (data, success) {
                processed++;
                if (success) {
                    result.push(data);
                }

                if (processed == dirFiles.length) {
                    callback(result);
                }
            });
        }
    });
}

findFilesAsync(function (data) {
    console.log(data);
});
