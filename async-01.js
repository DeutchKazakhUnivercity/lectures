// This example looks for all files in the current directory
// and search for the files which contains the 
// specified text.

var fs = require('fs');
var path = require('path');

var textToSearch = 'ne';

function testFile(fileName) {
    fs.lstat(fileName, function (err, stat) {
        if (err) throw err;
        if (stat.isFile()) {
            fs.readFile(fileName, function (err, fileContent) {
                if (err) throw err;
                var fileText = fileContent.toString();
                if (fileText.indexOf(textToSearch) != -1) {
                    console.log(fileName);
                }
            });
        }
    });
}

fs.readdir(__dirname, function (err, dirFiles) {
    if (err) throw err;
    for (i = 0; i< dirFiles.length; i++) {
        var fileName = path.resolve(__dirname, dirFiles[i]);
        testFile(fileName);
    }
});