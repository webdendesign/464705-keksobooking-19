'use strict';
(function () {
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');

  var TypeHousingMap = {
    'bungalo': {
      MIN: 0,
      MAX: 1000000
    },
    'flat': {
      MIN: 1000,
      MAX: 1000000
    },
    'house': {
      MIN: 5000,
      MAX: 1000000
    },
    'palace': {
      MIN: 10000,
      MAX: 1000000
    }
  };

  function onChangeType(evt) {
    adForm.price.placeholder = TypeHousingMap[evt.currentTarget.value].MIN;
  }

  window.housePrice = {
    onChangeType: onChangeType
  };
})();
