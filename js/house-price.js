'use strict';
(function () {
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');

  var typeHousingMap = {
    'bungalo': {
      min: 0,
      max: 1000000
    },
    'flat': {
      min: 1000,
      max: 1000000
    },
    'house': {
      min: 5000,
      max: 1000000
    },
    'palace': {
      min: 10000,
      max: 1000000
    }
  };

  function onChangeType(evt) {
    adForm.price.placeholder = typeHousingMap[evt.currentTarget.value].min;
  }

  window.housePrice = {
    onChangeType: onChangeType
  };
})();
