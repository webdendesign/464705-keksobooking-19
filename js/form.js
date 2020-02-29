'use strict';
(function () {
  var TitleLength = {
    LENGTH_MIN: 30,
    LENGTH_MAX: 100
  };

  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var roomNumberElement = adForm.querySelector('#room_number');
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

  window.disabled.changeForm();
  window.formCoordinate.getMainPinStartCoordinates();

  function addEventForm() {
    adForm.classList.remove('ad-form--disabled');
    window.disabled.changeForm();
    roomNumberElement.addEventListener('change', window.rooms.onChangeRooms);
    typeHousingElement.addEventListener('change', window.housePrice.onChangeType);
    timeInElement.addEventListener('change', window.time.onChangeTimeIn);
    timeOutElement.addEventListener('change', window.time.onChangeTimeOut);
    adForm.addEventListener('reset', window.resetForm.onResetForm);
    adForm.addEventListener('submit', onSubmitForm);
    document.addEventListener('pinMoveEvent', window.form.onPinMoveEventAddressField);
  }

  function removeEventForm() {
    adForm.classList.add('ad-form--disabled');
    window.disabled.changeForm();
    roomNumberElement.removeEventListener('change', window.rooms.onChangeRooms);
    typeHousingElement.removeEventListener('change', window.housePrice.onChangeType);
    timeInElement.removeEventListener('change', window.time.onChangeTimeIn);
    timeOutElement.removeEventListener('change', window.time.onChangeTimeOut);
    adForm.removeEventListener('reset', window.resetForm.onResetForm);
    adForm.removeEventListener('submit', onSubmitForm);
    document.addEventListener('pinMoveEvent', window.formCoordinate.onPinMoveEventAddressField);
  }

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
      var formNew = new FormData(adForm);
      window.ajax({
        method: 'POST',
        url: 'https://js.dump.academy/keksobooking',
        data: formNew,
        success: function () {
          window.resetForm.onResetForm();
          window.load.renderSuccessMessage();

        },
        sendError: function () {
          window.resetForm.onResetForm();
          window.load.renderErrorMessage();
        },
        type: 'json'
      });
    }

  }

  window.form = {
    startForm: addEventForm,
    resetForm: removeEventForm
  };

})();
