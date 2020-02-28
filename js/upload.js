'use strict';

(function () {

  window.upload = function (data, onLoad, onError) {

    var URL = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка');
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
