'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var ERROR_REQUEST_CODE = 400;
  var ERROR_NOT_FOUND_CODE = 404;
  var ERROR_SERVER_CODE = 500;

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_CODE:
          onLoad(xhr.response);
          break;
        case ERROR_REQUEST_CODE:
          onError('Ошибка запроса');
          break;
        case ERROR_NOT_FOUND_CODE:
          onError('Не найдено');
          break;
        case ERROR_SERVER_CODE:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
