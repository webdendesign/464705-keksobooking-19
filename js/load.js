'use strict';

(function () {

  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var statusCode = {
      OK: 200
    };

    var TIMEOUT_IN_MS = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        var source = xhr.response;
        onLoad(source);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();

  }

  window.load = load;

})();
