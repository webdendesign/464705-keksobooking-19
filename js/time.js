'use strict';
(function () {
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');

  function onChangeTimeIn(evt) {
    var timeInCurrentValue = evt.currentTarget.value;
    timeOutElement.value = timeInCurrentValue;
  }

  function onChangeTimeOut(evt) {
    var timeOutCurrentValue = evt.currentTarget.value;
    timeInElement.value = timeOutCurrentValue;
  }

  window.time = {
    onChangeTimeIn: onChangeTimeIn,
    onChangeTimeOut: onChangeTimeOut
  };
})();
