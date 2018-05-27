var pageLoad = function () {
    'use strict';
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
    var bestiiTable = document.getElementById('bestiiTable'),
        request3 = crXMLHttpRequest();
    bestiiTable.onclick = function () {
        //запрос для json файла
        request3.open('GET', 'ForAJAX/bestiarii.json', false);
        request3.send();
        if (request3.status != 200) {//выводим ошибки
            alert(request3.status + ': ' + request3.statusText);
        } else {
            var i = 0,
                JSONDoc = JSON.parse(request3.responseText),
                table = '<tr><th>Вид</th><th>Цена</th></tr>';
            for (name in JSONDoc.Kind) {
                table += '<tr><td>' + JSONDoc.Kind[name] + '</td><td>' + JSONDoc.Price[name] + '</td><tr>';//создаём таблицу для полученных данных
                i++;
            }
            bestiiTable.style.visibility = 'hidden';
            document.getElementById('forJson').innerHTML = table;//выводим результат
        }
    };
    uploadYourMedal();//загрузка картинки
};
function uploadYourMedal() {
    'use strict';
    images.onchange = function () {
        //при получении ссылки на картинку меняем её размер и вывдим
        var medal = document.getElementById('forImage');
        medal.innerHTML = '';
        if (images.files) {
            var medalPic = new Image();
            medalPic.src = URL.createObjectURL(images.files[0]);
            medalPic.style.width = 100 + 'px';
            medalPic.style.height = 100 + 'px';
            medalPic.style.marginTop = 10 + 'px';
            medal.appendChild(medalPic);
        } else {
            var medalPic = new Image();
            medalPic.src = images.value;
            medalPic.style.width = 100 + 'px';
            medalPic.style.height = 100 + 'px';
            medalPic.style.marginTop = 10 + 'px';
            medal.appendChild(medalPic);
        }
    };
}
//запускаем скрип при загрузке страницы
if (window.addEventListener) {
    window.addEventListener('load', pageLoad);
} else {//для ІЕ
    window.attachEvent('onload', pageLoad);
}