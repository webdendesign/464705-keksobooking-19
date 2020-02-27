'use strict';
(function () {
  var TitleLength = {
    LENGTH_MIN: 30,
    LENGTH_MAX: 100
  };
  var Coordinate = {
    LEFT: 570,
    TOP: 375
  };

  var main = document.querySelector('main');
  var mapPinMain = main.querySelector('.map__pin--main');
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

  function addEventAdForm() {
    adForm.classList.remove('ad-form--disabled');
    window.disabled.changeForm();
    roomNumberElement.addEventListener('change', window.rooms.onChangeRooms);
    typeHousingElement.addEventListener('change', onChangeType);
    timeInElement.addEventListener('change', window.time.onChangeTimeIn);
    timeOutElement.addEventListener('change', window.time.onChangeTimeOut);
    adForm.addEventListener('reset', onResetForm);
    adForm.addEventListener('submit', onSubmitForm);
    document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);
  }

  function removeEventAdForm() {
    adForm.classList.add('ad-form--disabled');
    window.disabled.changeForm();
    roomNumberElement.removeEventListener('change', window.rooms.onChangeRooms);
    typeHousingElement.removeEventListener('change', onChangeType);
    timeInElement.removeEventListener('change', window.time.onChangeTimeIn);
    timeOutElement.removeEventListener('change', window.time.onChangeTimeOut);
    adForm.removeEventListener('reset', onResetForm);
    adForm.removeEventListener('submit', onSubmitForm);
    document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);
  }

  var housingTypes = Object.keys(typeHousingMap);

  var valid = true;
  var errorBox = null;
  function renderError(element, errorText) {
    errorBox = document.createElement('div');
    errorBox.className = 'errorbox';
    var errorParagraph = document.createElement('p');
    errorParagraph.className = 'errorbox__paragraph';
    errorParagraph.textContent = errorText;

    errorBox.appendChild(errorParagraph);
    element.insertAdjacentElement('afterEnd', errorBox);

    element.addEventListener('focus', onErrorRemove);

    element.addEventListener('blur', onFocusRemove);
  }

  function onErrorRemove(evt) {
    evt.preventDefault();
    if (errorBox) {
      errorBox.remove();
    }
  }

  function onFocusRemove(evt) {
    onErrorRemove(evt);
    evt.target.style.border = 'none';
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  function onChangeType(evt) {
    adForm.price.placeholder = typeHousingMap[evt.currentTarget.value].min;
  }

  function onPinMoveEventAddressField(evt) {
    adForm.address.value = evt.coords.x + ', ' + evt.coords.y;
  }

  document.addEventListener('pinMoveEvent', onPinMoveEventAddressField);

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
    inputName.style.outline = 'none';
    inputName.style.border = '2px solid red';
  }

  function changePage() {
    adForm.reset();
    window.map.clearMap();
    removeEventAdForm();
    window.filter.disableFilterForm();
    mapPinMain.style.left = Coordinate.LEFT + 'px';
    mapPinMain.style.top = Coordinate.TOP + 'px';
    window.formCoordinate.getMainPinStartCoordinates();
    window.movement.init(function () {
      var pinBoxElement = document.querySelector('.map__pins');
      addEventAdForm();
      window.filter.enableFilterForm();
      var pins = window.data.get().slice(0, 5);
      window.map.renderElements(pins, pinBoxElement, window.pin.createAdPin);
    });
  }

  function onResetForm() {
    changePage();
  }

  function onSubmitForm(evt) {
    evt.preventDefault();

    if (adForm.title) {
      var strLength = adForm.title.value.length;
      if (strLength < TitleLength.LENGTH_MIN || strLength > TitleLength.LENGTH_MAX) {
        valid = false;
        changeInputStyle(adForm.title);
        renderError(adForm.title, 'Количество символов в заголовке объявления не должно быть меньше 30 и больше 100');
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
            changeInputStyle(adForm.price);
            renderError(adForm.price, 'Цена не может быть ниже указанного значения или выше 1000000');
            return;
          } else {
            valid = true;
          }
        }
      }
    }

    if (valid) {
      adForm.addEventListener('submit', function (evt) {

        window.upload(new FormData(adForm), function (response) {
          window.load.renderSuccessMessage();
          changePage();
        });
        evt.preventDefault();
      });
    }
  }

  window.form = {
    startForm: addEventAdForm
  };

})();
