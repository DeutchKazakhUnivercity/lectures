// This example looks for all files in the current directory
// and search for the files which contains the
// specified text.

var fs = require('fs');
var path = require('path');
var Q = require('q');

var textToSearch = 'ne';
fs.readdirPromise = Q.denodeify(fs.readdir);
fs.lstatPromise = Q.denodeify(fs.lstat);
fs.readFilePromise = Q.denodeify(fs.readFile);

function isFile(fileName) {
    return fs.lstatPromise(fileName).then(function (stat) {
        if (stat.isFile()) {
            return fileName;
        }

        return null;
    });
}

function readContent(fileName) {
    if (fileName == null) {
        return null;
    }

    return fs.readFilePromise(fileName).then(function (fileContent) {
        return {
            name: fileName,
            content: fileContent.toString()
        };
    });
}

function hasText(fileData){
    if (fileData == null) {
        return null;
    }

    var fileText = fileData.content;
    if (fileText.indexOf(textToSearch) != -1) {
        console.log(fileData.name);
    }
}

function onError(error) {
    console.log("Error happens", error);
}

fs.readdirPromise(__dirname).then(function (dirFiles){
    for (i = 0; i< dirFiles.length; i++) {
        var fileName = path.resolve(__dirname, dirFiles[i]);
        isFile(fileName)
            .then(readContent)
            .then(hasText)
            .then(null, onError);
    }
}, onError);
