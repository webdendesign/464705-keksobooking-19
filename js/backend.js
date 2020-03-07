'use strict';
(function () {
  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var TIMEOUT_IN_MS = 10000;
    var StatusCode = {
      OK: 200
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
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

  function upload(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var StatusCode = {
      OK: 200
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  };
})();
