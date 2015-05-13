// This example looks for all files in the current directory
// and search for the files which contains the 
// specified text.

var fs = require('fs');
var path = require('path');

var textToSearch = 'ne';

function testFile(fileName) {
    var stat = fs.lstatSync(fileName);
    if (stat.isFile()) {
        var fileContent = fs.readFileSync(fileName);
        var fileText = fileContent.toString();
        if (fileText.indexOf(textToSearch) != -1) {
            console.log(fileName);
        }
    }
}

var dirFiles = fs.readdirSync(__dirname);
for (i = 0; i< dirFiles.length; i++) {
    var fileName = path.resolve(__dirname, dirFiles[i]);
    testFile(fileName);
}