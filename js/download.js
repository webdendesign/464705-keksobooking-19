'use strict';
(function () {
  function onBeginApp() {
    window.movement.init(function () {
      var mapPins = document.querySelector('.map__pins');
      window.form.startForm();
      window.filter.enableFilterForm();

      var onLoad = function (data) {
        window.data.set(data);
        var pins = window.data.get().slice(0, 5);
        window.map.renderElements(pins, mapPins, window.pin.createPin);
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

      window.load(onLoad, onError);
    });
  }

  document.addEventListener('DOMContentLoaded', onBeginApp);
})();
