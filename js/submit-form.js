'use strict';
(function () {
  var TitleLength = {
    LENGTH_MIN: 30,
    LENGTH_MAX: 100
  };

  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var typeHousingElement = adForm.querySelector('#type');

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

  function onLoad() {
    window.resetForm.onResetForm();
    window.messageSuccess.renderSuccessMessage();
  }

  function onError() {
    window.resetForm.onResetForm();
    window.messageError.renderErrorMessage();
  }

  window.disabled.changeForm();
  window.formCoordinate.getMainPinStartCoordinates();
  var housingTypes = Object.keys(typeHousingMap);
  var valid = true;

  function onSubmitForm(evt) {
    evt.preventDefault();

    if (adForm.title) {
      var strLength = adForm.title.value.length;
      if (strLength < TitleLength.LENGTH_MIN || strLength > TitleLength.LENGTH_MAX) {
        valid = false;
        window.error.changeInputStyle(adForm.title);
        window.error.renderError(adForm.title, 'Количество символов в заголовке объявления не должно быть меньше 30 и больше 100');
        return;
      } else {
        valid = true;
      }
    }

    if (adForm.price) {
      for (var i = 0; i < housingTypes.length; i++) {
        if (typeHousingElement.value === housingTypes[i]) {
          if (adForm.price.value < typeHousingMap[housingTypes[i]].min || adForm.price.value > typeHousingMap[housingTypes[i]].max) {
            valid = false;
            window.error.changeInputStyle(adForm.price);
            window.error.renderError(adForm.price, 'Цена не может быть ниже указанного значения или выше 1000000');
            return;
          } else {
            valid = true;
          }
        }
      }
    }

    if (valid) {
      window.upload(new FormData(adForm), onLoad, onError);
    }
  }

  window.submitForm = {
    onSubmitForm: onSubmitForm
  };
})();
