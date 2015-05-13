var fs = require('fs');
var path = require('path');

function testFile(fileName) {
    fs.lstat(fileName, function (err, stat) {
        if (err) throw err;
        if (stat.isFile()) {
            fs.readFile(fileName, function (err, fileContent) {
                if (err) throw err;
                var fileText = fileContent.toString();
                if (fileText.indexOf('ne') != -1) {
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