'use strict';
(function () {
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHousing = adForm.querySelector('#type');

  window.disabled.changeForm();
  window.formCoordinate.getMainPinStartCoordinates();

  function addEventForm() {
    adForm.classList.remove('ad-form--disabled');
    window.disabled.changeForm();
    roomNumber.addEventListener('change', window.rooms.onChangeRooms);
    typeHousing.addEventListener('change', window.housePrice.onChangeType);
    timeIn.addEventListener('change', window.time.onChangeTimeIn);
    timeOut.addEventListener('change', window.time.onChangeTimeOut);
    adForm.addEventListener('submit', window.submitForm.onSubmitForm);
    adForm.addEventListener('reset', window.resetForm.onResetForm);
    document.addEventListener('pinMoveEvent', window.form.onPinMoveEventAddressField);
  }

  function removeEventForm() {
    adForm.classList.add('ad-form--disabled');
    window.disabled.changeForm();
    roomNumber.removeEventListener('change', window.rooms.onChangeRooms);
    typeHousing.removeEventListener('change', window.housePrice.onChangeType);
    timeIn.removeEventListener('change', window.time.onChangeTimeIn);
    timeOut.removeEventListener('change', window.time.onChangeTimeOut);
    adForm.removeEventListener('submit', window.submitForm.onSubmitForm);
    adForm.removeEventListener('reset', window.resetForm.onResetForm);
    document.addEventListener('pinMoveEvent', window.formCoordinate.onPinMoveEventAddressField);
  }

  window.form = {
    startForm: addEventForm,
    resetForm: removeEventForm
  };
})();
