var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(100);
    }, 1000);
});


p.then(function (data) {
    console.log(data);
});