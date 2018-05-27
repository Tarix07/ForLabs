var pageloadDrag= function () {
    "use strict";
    //задаём элементы, которые будем двигать
    var logored = document.getElementById('red'),
        logoblue = document.getElementById('blue'),
        logoyellow = document.getElementById('yellow'),
        logo3 = document.getElementById('logo3'),
        dragelements,
        //зоны передвижения элементов
        drophere,
        stylebox;
        if (document.getElementsByClassName) { //для работы в старых браузерах
            drophere = document.getElementsByClassName('drophere')[0],
            stylebox = document.getElementsByClassName('stylebox')[0];
        } else {
            drophere = document.querySelectorAll('.drophere')[0];
            stylebox = document.querySelectorAll('.stylebox')[0];
        }
    function catchhand(e) {//захват элемента для передвижения
        dragelements = this;
        e = e || window.event;
        dragelements.ondragstart = function () {
            return false;
        };
        function movingmouse(e) {//перетаскивание элементов
            e = e || window.event;
            if (!e.pageX) {
                e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            if (e.pageX - dragelements.offsetWidth / 2 > stylebox.offsetLeft && e.pageX + dragelements.offsetWidth / 2 < stylebox.offsetLeft + stylebox.offsetWidth) {
                dragelements.style.left = e.pageX - dragelements.offsetWidth / 2 + 'px';
            } else if (e.pageX + dragelements.offsetWidth / 2 < stylebox.offsetLeft + stylebox.offsetWidth) {
                dragelements.style.left = stylebox.offsetLeft + 'px';
            }
            if (e.pageY - dragelements.offsetHeight / 2 > stylebox.offsetTop && e.pageY + dragelements.offsetHeight / 2 < stylebox.offsetTop + stylebox.offsetHeight) {
                dragelements.style.top = e.pageY - dragelements.offsetHeight / 2 + 'px';
            } else if (e.pageY + dragelements.offsetHeight / 2 < stylebox.offsetTop + stylebox.offsetHeight) {
                dragelements.style.top = stylebox.offsetTop + 'px';
            }
        }
        dragelements.style.position = 'absolute';
        movingmouse(e);
        dragelements.style.zIndex = 10;//
        document.onmousemove = movingmouse;
        dragelements.onmouseup = function (e) {
            e = e || window.event;
            if (!e.pageX) {//запомнить место элемента после перемещения
                e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            document.onmousemove = null;
            dragelements.onmouseup = null;
            var x = document.getElementsByTagName('h2');
            if (e.pageX > drophere.offsetLeft && e.pageX < drophere.offsetLeft + drophere.offsetWidth && e.pageY > drophere.offsetTop && e.pageY < drophere.offsetHeight + drophere.offsetTop) {//изменение элементов станицы при попадании одного из элементов в drophere
                if (dragelements === logored) {
                    document.images['logotip'].src = 'images/medals/wolf2.png';
                    for (var i = 0; i < x.length; i++){
                        x[i].style.color = 'red';
                    }
                    logored.style.position = 'relative';
                    logored.style.top = '15px';
                    logored.style.left = '15px';
                }
                if (dragelements === logo3) {
                    document.images['logotip'].src = 'images/medals/logo.png';
                    for(var i = 0; i < x.length; i++){
                        x[i].style.color = 'white';
                    }
                    logo3.style.position = 'relative';
                    logo3.style.top = '15px';
                    logo3.style.left = '15px';
                }
                if (dragelements === logoblue) {
                    document.images['logotip'].src = 'images/medals/wolf3.png';
                    for(var i = 0; i < x.length; i++){
                        x[i].style.color = 'blue';
                    }
                    logoblue.style.position = 'relative';
                    logoblue.style.top = '15px';
                    logoblue.style.left = '15px';
                }
                if (dragelements === logoyellow) {
                    document.images['logotip'].src = 'images/medals/wolf1.png';
                    for(var i = 0; i < x.length; i++){
                        x[i].style.color = 'yellow';
                    }
                    logoyellow.style.position = 'relative';
                    logoyellow.style.top = '15px';
                    logoyellow.style.left = '15px';
                }
            }
        };
    }
    logored.onmousedown = catchhand;
    logo3.onmousedown = catchhand;
    logoblue.onmousedown = catchhand;
    logoyellow.onmousedown = catchhand;
    window.onresize = reset_blocks;//вернуть элементы на место при маштабировании страницы
    function reset_blocks() {
        logored.style.position = 'relative';
        logo3.style.position = 'relative';
        logoblue.style.position = 'relative';
        logoyellow.style.position = 'relative';
        logored.style.left = '15px';
        logo3.style.left = '15px';
        logoblue.style.left = '15px';
        logoyellow.style.left = '15px';
        logored.style.top = '15px';
        logo3.style.top = '15px';
        logoblue.style.top = '15px';
        logoyellow.style.top = '15px';
    } 
};
//запускаем скрип при загрузке страницы
if (window.addEventListener) {
    window.addEventListener('load', pageloadDrag);
} else {
    window.attachEvent('onload', pageloadDrag);
}