var pageLoad = function () {
    'use strict';
    nwxforms(this);//полифил
    var form = document.getElementById('valForm');
    form.onsubmit = saveCookies;
    cooked();
    document.getElementById('logOut').onclick = delete_cookie;
};


function saveCookies() {
    'use strict';
    if (document.forms['valForm']['name'].checkValidity() && document.forms['valForm']['surname'].checkValidity() && document.forms['valForm']['age'].checkValidity() && document.forms['valForm']['gender'].checkValidity() && document.forms['valForm']['tel'].checkValidity() && document.forms['valForm']['email'].checkValidity()) {//сохраняем данные в куки
        var expire = new Date();
        expire.setHours(expire.getHours() + 1);//время, когда куки будет удалён
        document.cookie = 'witcher=' + document.forms['valForm']['surname'].value + ' ' + document.forms['valForm']['name'].value + '; expires=' + expire.toUTCString() + ';';
        window.location.reload();
    }
}
function cooked() {//проверяем есть ли сохранённые куки для этой страницы
    'use strict';
    if(document.cookie) {//если есть меняем содержимое страницы
        var cookies = document.cookie.split(";"),
            fullName = cookies[0].split("="),
            name = fullName[1];
        document.getElementById('logOut').style.visibility = 'visible';
        document.getElementById('forAuUser').innerHTML = '<h3>' + 'Приветствую тебя ' + name + '! К сожалению заказов пока нет. Предлагаю посмотреть это видео, чтобы скоротать время.</h3><br />' + '<iframe width="560" height="315" src="https://www.youtube.com/embed/w8bAikXiJDw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
}
function delete_cookie () {//удаление куки
    "use strict";
    var cookie_date = new Date ( );  // Текущая дата и время
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = 'witcher=; expires=' + cookie_date.toGMTString();
    window.location.reload();
}
//запускаем скрип при загрузке страницы
if (window.addEventListener) {
    window.addEventListener('load', pageLoad);
} else {
    window.attachEvent('onload', pageLoad);
}