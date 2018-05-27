var pageLoad = function () {
    'use strict';
    var booksTable = document.getElementById('booksTable');
    var poem = document.getElementById('poem');
    function crXMLHttpRequest() {//возможность делать http запросы
        var res = false;
        if (window.XMLHttpRequest) {
            res = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            if (new ActiveXObject('Microsoft.XMLHTTP')) {
                res = new ActiveXObject('Microsoft.XMLHTTP');
            } else if (new ActiveXObject('Msxml2.XMLHTTP')) {
                res = new ActiveXObject('Msxml2.XMLHTTP');
            } else {
                res = false;
                alert('Невозможно отправить запрос!');
            }
        }
        return res;
    }
    var request = crXMLHttpRequest();
    poem.onclick = function () {
        //запрос для txt файла
        request.open('GET', 'ForAJAX/ajax_poemRU.txt', false);
        request.send();
        if (request.status != 200) {//выводим ошибки
            alert(request.status + ': ' + request.statusText);
        } else {
            //выводим полученную поэму
            document.getElementById('otvet').innerHTML = '<p id="stix">' + request.responseText.replace(/\n/g, '<br />') + '</p>';
        }
    };
    var request2 = crXMLHttpRequest();
    booksTable.onclick = function () {
        //запрос для xml файла
        request2.open('GET', 'ForAJAX/books.xml', false);
        request2.send();
        if (request2.status != 200) {//выводим ошибки
            alert(request2.status + ': ' + request2.statusText);
        } else {
            var i,
                //создаём тамблицу для полученных данных
                xmlDoc = request2.responseXML,
                table = '<tr><th>Название</th><th>Краткое описание</th><th>Скачать(fb2)</th></tr>',
                x = xmlDoc.getElementsByTagName("book");
            for (i = 0; i < x.length; i++) {
                table += '<tr><td>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</td><td>' + x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue + '</td><td><a class="ulightbox" href="' + x[i].getElementsByTagName('download')[0].childNodes[0].nodeValue + '" title="Нажмите, чтобы скачать">тут</a></td></tr>';
            }
            document.getElementById('booksTable').style.visibility = 'hidden';
            document.getElementById("forXml").innerHTML = table;//выводим таблицу
        }
    };
    
};
//запускаем скрипт при загрузке страцицы
if (window.addEventListener) {
    window.addEventListener('load', pageLoad);
} else {
    window.attachEvent('onload', pageLoad);
}

