var images,
    сount = 0,
    StopStartAnimation = true;
function pageloadAnimation() {
    'use strict';
    //задаём размер холста для анимации
    document.getElementById('plotva').width = 600;
    document.getElementById('plotva').height = 350;
    images = new Array(61);
    for (var i = 0; i < images.length; i++) {//создаём массив ссылок на кадры
        images[i] = new Image();
        images[i].src = 'images/gif/' + i + '.gif';
    }
    plotvaUpnDown();
    document.getElementById('plotva').onclick = function() {//остановка/запуск анимации при клике по ней
        if (StopStartAnimation) StopStartAnimation = false;
        else {
            StopStartAnimation = true;
            plotvaUpnDown();
        }
    }
}
function plotvaUpnDown() {
    'use strict';
    var plotva = document.getElementById('plotva'),
        plotvaContext = plotva.getContext('2d');
    plotvaContext.drawImage(images[Math.floor(сount / 4)], 0, 0);//рисуем кадр
    imgCount = Math.floor((сount + 1) % 244);//след кадр
    if (StopStartAnimation) {
        requestAnimationFrame(plotvaUpnDown);//повтор
    }
}
//запускаем скрип при загрузке страницы
if (window.addEventListener) {
    window.addEventListener('load', pageloadAnimation);
} else {
    window.attachEvent('onload', pageloadAnimation);
}