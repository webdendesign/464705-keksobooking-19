'use strict';
(function () {

  var main = document.querySelector('main');
  var mapPinMain = main.querySelector('.map__pin--main');
  var adForm = main.querySelector('.ad-form');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHousing = adForm.querySelector('#type');
  var typeHousingElement = adForm.querySelector('#type');
  var guestNumber = adForm.querySelector('#capacity');
  var elementsInput = Array.from(adForm.elements);

  var TitleLength = {
    LENGTH_MIN: 30,
    LENGTH_MAX: 100
  };

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

  var Coordinate = {
    LEFT: 570,
    TOP: 375
  };

  var RoomForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0'],
  };

  function changeForm() {
    elementsInput.forEach(function (element) {
      element.disabled = adForm.classList.contains('ad-form--disabled') ? true : false;
    });
  }

  changeForm();
  getMainPinStartCoordinates();

  function getMainPinStartCoordinates() {
    var mainPinStartCoords = {
      x: parseInt(mapPinMain.style.left, 10) + mapPinMain.getBoundingClientRect().width / 2,
      y: parseInt(mapPinMain.style.top, 10) + mapPinMain.getBoundingClientRect().height / 2
    };

    adForm.address.value = Math.floor(mainPinStartCoords.x) + ', ' + Math.floor(mainPinStartCoords.y);
  }

  function onPinMoveEventAddressField(evt) {
    adForm.address.value = Math.round(evt.coords.x) + ', ' + Math.round(evt.coords.y);
  }

  document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);

  function addEventForm() {
    adForm.classList.remove('ad-form--disabled');
    changeForm();
    roomNumber.addEventListener('change', onChangeRooms);
    typeHousing.addEventListener('change', onChangeType);
    timeIn.addEventListener('change', onChangeTimeIn);
    timeOut.addEventListener('change', onChangeTimeOut);
    adForm.addEventListener('submit', onSubmitForm);
    adForm.addEventListener('reset', onResetForm);
    document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);
  }

  function removeEventForm() {
    adForm.classList.add('ad-form--disabled');
    changeForm();
    roomNumber.removeEventListener('change', onChangeRooms);
    typeHousing.removeEventListener('change', onChangeType);
    timeIn.removeEventListener('change', onChangeTimeIn);
    timeOut.removeEventListener('change', onChangeTimeOut);
    adForm.removeEventListener('submit', onSubmitForm);
    adForm.removeEventListener('reset', onResetForm);
    document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);
  }

  function changeRoomNumberValue(value) {
    Array.from(guestNumber.options).forEach(function (option) {
      option.disabled = !RoomForGuestsMap[value].includes(option.value);
    });
    guestNumber.value = value > 3 ? '0' : value;
  }

  changeRoomNumberValue(roomNumber.value);

  function onChangeRooms(evt) {
    changeRoomNumberValue(evt.currentTarget.value);
  }

  function onChangeType(evt) {
    adForm.price.placeholder = TypeHousingMap[evt.currentTarget.value].MIN;
  }

  function onChangeTimeIn(evt) {
    var timeInCurrentValue = evt.currentTarget.value;
    timeOut.value = timeInCurrentValue;
  }

  function onChangeTimeOut(evt) {
    var timeOutCurrentValue = evt.currentTarget.value;
    timeIn.value = timeOutCurrentValue;
  }

  function changePage() {
    adForm.reset();
    window.map.clearMap();
    window.form.resetForm();
    window.filter.disableFilterForm();
    mapPinMain.style.left = Coordinate.LEFT + 'px';
    mapPinMain.style.top = Coordinate.TOP + 'px';
    getMainPinStartCoordinates();
    window.movement.init(function () {
      var pinBoxElement = document.querySelector('.map__pins');
      window.form.startForm();
      window.filter.enableFilterForm();
      var pins = window.data.get().slice(0, 5);
      window.map.renderElements(pins, pinBoxElement, window.pin.createPin);
    });
  }

  function onResetForm() {
    changePage();
  }

  function onLoad() {
    window.resetForm.onResetForm();
    window.messageSuccess.renderSuccessMessage();
  }

  function onError() {
    window.resetForm.onResetForm();
    window.messageError.renderErrorMessage();
  }

  var housingTypes = Object.keys(TypeHousingMap);
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
          if (adForm.price.value < TypeHousingMap[housingTypes[i]].MIN || adForm.price.value > TypeHousingMap[housingTypes[i]].MAX) {
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
      window.backend.upload(new FormData(adForm), onLoad, onError);
    }
  }

  window.form = {
    startForm: addEventForm,
    resetForm: removeEventForm
  };
})();
