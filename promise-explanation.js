/**
Использование Promise позволяет писать асинхронный код в виде максимально приближенном к синхронному коду.

Пример задачи:
Получить заголовок первой и последней статьи на главной странице Хабра. 

Пример алгоритма:
1. Получение HTML c Хабра.
2. Получение списка заголовков по странице HTML в виде массива.
3. Распечатка первого и последнего элемента массива.
*/

var fs = require('fs'),
    axios = require('axios'),
    zlib = require('zlib');

/*Получение HTML c Хабра.*/
function getHtml() {
    return axios.get('http://habrahabr.kz/')
        .then(function (response) {
        console.log(typeof response);
            return response.data;
        })
    .then(function(data) {
        console.log(typeof data);
        return data;
    })
        .catch(function (error) {
            console.log(error);
        });
}

/*Получение списка заголовков по странице HTML в виде массива.*/
function getTitles(html) {
    var result = [];
    var startMarker = "<h1 class=\"topic-title\">"
        startIndex = html.indexOf(startMarker);
    
    while (startIndex !== -1) {
        var data = between(html, startMarker, "</h1>");
        data = between(data, ">", "</a>");
        result.push(data);
        
        html = html.substring(startIndex + 1);
        startIndex = html.indexOf(startMarker)
    }
    
    return result;
}

/**
Нахождение строки которая
расположена между заданными строками.
*/
function between(source, start, end) {
    var startIndex = source.indexOf(start);
    if (startIndex === -1) {
        return null;
    }
    
    var endIndex = source.indexOf(end, startIndex);
    return source.substring(
        startIndex + start.length,
        endIndex);
}

/**
Распечатка первого и последнего элемента массива.
*/
function printFirstAndLast(titles) {
    if (titles.length === 0) {
        console.log("Статей не найдено");
        return;
    }
    
    if (titles.length === 1) {
        console.log("Только одна статья", titles[0]);
        return;
    }
    
    console.log("Первая статья", titles[0]);
    console.log("Последняя статья", titles[titles.length - 1]);
}

/* Синхронный вариант 
Исключительно для иллюстративных целей.
*/
function doSync() {
    var html = getHtml();
    var titles = getTitles(html);
    printFirstAndLast(titles);
}

/* 
Асинхронный вариант с использованием Promise.
*/
function doPromise() {
    return getHtml()
        .then(getTitles)
        .then(printFirstAndLast);
}

//doPromise();

// Простые тесты для функции printFirstAndLast
//printFirstAndLast(["123", "234", "345", "456", "567", "678", "789", "890"]);
//printFirstAndLast([]);
//printFirstAndLast(["123"]);



//var html = fs.readFileSync('data/habr.html');
//var titles = getTitles(html.toString());
//console.log(titles);

// Тестирование функции between
//var title = "<h1 class=\"title\"><a href=\"http://habrahabr.ru/company/selectel/blog/258173/\" class=\"post_title\">Запуск услуги «Виртуальное приватное облако»</a></h1>";
//var data = between(title, "<h1 class=\"title\">", "</h1>");
//data = between(data, " class=\"post_title\">", "</a>");
//console.log(data);

function undefinedResult() {
    var data = "data";

    //console.log(data);
    return data;
}

var result = undefinedResult();
console.log(result);