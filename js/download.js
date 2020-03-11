'use strict';
(function () {
  var data = null;

  function onBeginApp() {
    window.movement.init(function () {
      var Amount = {
        BEGIN: 0,
        END: 5
      };
      var mapPins = document.querySelector('.map__pins');
      window.form.startWork();
      window.filter.enableForm();

      var onLoad = function (dataServer) {
        window.data.set(dataServer);
        var pins = window.data.get().slice(Amount.BEGIN, Amount.END);
        window.map.renderElements(pins, mapPins, window.pin.createObjectIcon);
      };

      var onError = function (errorMessage) {
        var main = document.querySelector('main');
        var errorBlock = document.createElement('div');
        errorBlock.classList.add('error-block');
        errorBlock.style.border = '1px solid orange';
        errorBlock.style.backgroundColor = 'yellow';
        errorBlock.style.textAlign = 'center';
        errorBlock.textContent = errorMessage;
        main.insertAdjacentElement('afterbegin', errorBlock);
      };

      window.backend.load(onLoad, onError);
    });
  }

  document.addEventListener('DOMContentLoaded', onBeginApp);

  function getData() {
    return data;
  }
  function setData(newData) {
    data = newData;
  }

  window.data = {
    get: getData,
    set: setData
  };
})();
