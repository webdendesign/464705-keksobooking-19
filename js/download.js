'use strict';
(function () {
  function onBeginApp() {
    window.movement.init(function () {
      var mapPins = document.querySelector('.map__pins');
      window.form.startForm();
      window.filter.enableFilterForm();
      window.ajax({
        url: 'https://js.dump.academy/keksobooking/data/sdf',
        type: 'json',
        success: function (data) {
          window.data.set(data);
          var pins = window.data.get().slice(0, 5);
          window.map.renderElements(pins, mapPins, window.pin.createPin);
        },
        sendError: function (errorMessage) {
          var mainElement = document.querySelector('main');
          var errorBlock = document.createElement('div');
          errorBlock.classList.add('error-block');
          errorBlock.style.border = '2px solid green';
          errorBlock.style.textAlign = 'center';
          errorBlock.textContent = errorMessage;
          mainElement.insertAdjacentElement('afterbegin', errorBlock);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', onBeginApp);
})();
