'use strict';
(function () {

  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');

  var roomNumberElement = adForm.querySelector('#room_number');
  var guestNumberElement = adForm.querySelector('#capacity');

  var roomForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  function changeRoomNumberValue(value) {
    Array.from(guestNumberElement.options).forEach(function (option) {
      option.disabled = !roomForGuestsMap[value].includes(option.value);
    });
    guestNumberElement.value = value > 3 ? '0' : value;
  }

  changeRoomNumberValue(roomNumberElement.value);

  function onChangeRooms(evt) {
    changeRoomNumberValue(evt.currentTarget.value);
  }

  window.rooms = {
    onChangeRooms: onChangeRooms
  };

})();
