'use strict';

(function () {

  function upload(data, onLoad, onError) {

    var URL = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.upload = upload;

})();
