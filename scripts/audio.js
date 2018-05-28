function docLoad() {
    'use strict';
    var auOne = document.getElementById('au1'),
        sound = document.getElementById('sound');
    auOne.addEventListener('play', function() {
        sound.pause();
        auOne.play();
    });
    sound.addEventListener('play', function() {
        auOne.pause();
        sound.play();
    });
    document.getElementById('audioInput').addEventListener('change', checker, false);//ждём пока пользователь выберет файл
}
function checker(e) {
    'use strict';
    var fileType = this.files[0].type;//проверяем аудио файл или нет
    if (fileType.indexOf('audio') != -1) {
        loadFile(this.files[0], ifSound);
    } else {
        alert('Это не аудио файл!')
    }
}
function loadFile(file, loaded)//загружаем
{
    var reader = new FileReader();
    reader.onload = loaded;
    reader.readAsDataURL(file);
}

function ifSound(evt)
{
    document.getElementById('sound').src = evt.target.result;//выводим
    stopAllAudio();
    document.getElementById('sound').play();//сразу проигрываем
}
function stopAllAudio() {
    var allAudios = document.querySelectorAll('audio');
	allAudios.forEach(function(audio){
		audio.pause();
    });
}


//запускаем скрипт при загрузке страцицы
if (window.addEventListener) {
    window.addEventListener('load', docLoad);
} else {
    window.attachEvent('onload', docLoade);
}