var pageLoad = function () {
    "use strict";
    //параметры холста
    document.getElementById('wolf').width = 300;
    document.getElementById('wolf').height = 300;
    var drawingWolf = document.getElementById('wolf');
    if (drawingWolf && drawingWolf.getContext) {
        var wolf = drawingWolf.getContext('2d'),
            wolf2 = drawingWolf.getContext('2d');
        wolf2.fillStyle = 'grey';//меняем цвет заполнение
        wolf2.strokeStyle = 'black';//меняем цвет линий
        //параметры надписи
        wolf2.font = "40pt Calibri";
        wolf2.fillText('WOLF', 90, 280);
        wolf2.strokeText('WOLF', 90, 280);
        //
        wolf.beginPath();
        wolf.lineWidth = 5;//ширина линии
        wolf.moveTo(45, 195);
        wolf.quadraticCurveTo(115, 70, 215, 50);
        wolf.lineTo(190, 80);
        wolf.quadraticCurveTo(225, 100, 225, 130);
        wolf.lineTo(250, 150);
        wolf.quadraticCurveTo(240, 185, 185, 160);
        wolf.bezierCurveTo(175, 175, 190, 200, 175, 225);
        wolf.stroke();
    }
    
    
    
    //задаём параметры холста и действия для рисования
    canvas = document.getElementById("risovalka");
    if (window.innerWidth > 500){
        canvas.width = 500;
        canvas.height = 400;   
    } else {
        canvas.width = 300;
        canvas.height = 300;  
    }
    context = canvas.getContext("2d");
    canvas.onmousedown = start;
    canvas.onmouseup = stop;
    canvas.onmouseleave = leave;
    canvas.onmousemove = draw;
    //изменение параметров кисти
    document.getElementById('clearCanvas').onclick = clearCanvas;
    document.getElementById('colorRed').onclick = red;
    document.getElementById('colorBlue').onclick = blue;
    document.getElementById('colorYellow').onclick = yellow;
    document.getElementById('colorGrey').onclick = grey;
    document.getElementById('smallS').onclick = small;
    document.getElementById('normalS').onclick = normal;
    document.getElementById('largeS').onclick = large;
    document.getElementById('hugeS').onclick = huge;
    document.getElementById('eraser').onclick = white;
};
var canvas,
    context,
    X = new Array(),
    Y = new Array(),
    Drag = new Array(),
    paint,
    colorRed = "red",
    colorBlue = "blue",
    colorYellow = "yellow",
    colorGrey = "grey",
    eraser = "white",
    Color = new Array(),
    cursorColor = colorGrey,
    Size = new Array(),
    cursorSize = "normal";

function Click(x, y, dragging) {
    X.push(x);
    Y.push(y);
    Drag.push(dragging);
    Color.push(cursorColor);
    Size.push(cursorSize);
}
function start(e) {//определеям положение курсора на холсте
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
		
    paint = true;
    new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    newdraw();
}
function newdraw() {
    "use strict";
    var radius;
    context.lineJoin = "round";
    for (var i=0; i < X.length; i++) {//определяем размер кисти выбраной пользователем
        if(Size[i] == "small") {
            radius = 2;
		} else if(Size[i] == "normal") {
			radius = 5;
		} else if(Size[i] == "large") {
			radius = 10;
		} else if(Size[i] == "huge") {
			radius = 20;
        }
        //соединяем точки 
        context.beginPath();
        if(Drag[i] && i){
            context.moveTo(X[i-1], Y[i-1]);
        } else {
            context.moveTo(X[i]-1, Y[i]);
        }
        context.lineTo(X[i], Y[i]);
        context.closePath();
        context.strokeStyle = Color[i];
        context.lineWidth = radius;
        context.stroke();
    }
}
function draw(e) {//рисуем, при передвижении курсора по холсту
    if(paint) {
        Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        newdraw();
    }
};
function leave(e) {//при выходе курсора за размеры холста, прекратить рисовать
    paint = false;
}
function stop(e) {//закончить рисовать
    paint = false;
    newdraw();
};
function clearCanvas()//очистка холста
{
    X = new Array();
    Y = new Array();
    Drag = new Array();
    Color = new Array();
    Size = new Array();
	context.clearRect(0, 0, canvas.width, canvas.height);
}
//цвета кисти
function red() {
    cursorColor = colorRed;
}
function blue() {
    cursorColor = colorBlue;
}
function grey() {
    cursorColor = colorGrey;
}
function yellow() {
    cursorColor = colorYellow;
}
//размеры кисти
function small() {
    cursorSize = "small";
}
function normal() {
    cursorSize = "normal";
}
function large() {
    cursorSize = "large";
}
function huge() {
    cursorSize = "huge";
}
//тёрка
function white() {
    cursorColor = eraser;
}
//запускаем скрип при загрузке страницы
if (window.addEventListener) {
    window.addEventListener('load', pageLoad);
} else {//для ІЕ
    window.attachEvent('onload', pageLoad);
}