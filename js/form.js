'use strict';
(function () {

  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var roomNumberElement = adForm.querySelector('#room_number');
  var typeHousingElement = adForm.querySelector('#type');

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
    adForm.addEventListener('submit', window.submitForm.onSubmitForm);
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
    adForm.removeEventListener('submit', window.submitForm.onSubmitForm);
    document.addEventListener('pinMoveEvent', window.formCoordinate.onPinMoveEventAddressField);
  }

  window.form = {
    startForm: addEventForm,
    resetForm: removeEventForm
  };

})();
