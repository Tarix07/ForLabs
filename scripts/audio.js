function onDocLoaded() {
    'use strict';
    document.getElementById('audioInput').addEventListener('change', onChosenFileChange, false);//ждём пока пользователь выберет файл
}
function onChosenFileChange(evt) {
    'use strict';
    var fileType = this.files[0].type;//проверяем аудио файл или нет
    if (fileType.indexOf('audio') != -1) {
        loadFileObject(this.files[0], onSoundLoaded);
    }
}
function loadFileObject(fileObj, loadedCallback)//загружаем
{
    var reader = new FileReader();
    reader.onload = loadedCallback;
    reader.readAsDataURL(fileObj);
}
function onSoundLoaded(evt)
{
    document.getElementById('sound').src = evt.target.result;//выводим
    document.getElementById('sound').play();//сразу проигрываем
}



//запускаем скрипт при загрузке страцицы
if (window.addEventListener) {
    window.addEventListener('load', onDocLoaded);
} else {
    window.attachEvent('onload', onDocLoaded);
}