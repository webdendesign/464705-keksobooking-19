'use strict';
(function () {
  var Amount = {
    BEGIN: 0,
    END: 5
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

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var main = document.querySelector('main');
  var mapPinMain = main.querySelector('.map__pin--main');
  var adForm = main.querySelector('.ad-form');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHousing = adForm.querySelector('#type');
  var guestNumber = adForm.querySelector('#capacity');
  var elementsInput = Array.from(adForm.elements);
  var fileChooser = adForm.querySelector('.ad-form__field input[type=file]');
  var show = adForm.querySelector('.ad-form-header__preview img');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var fileChooserHouse = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var previewHouse = photoContainer.querySelector('.ad-form__photo');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorDiv = null;
  var successMessage = null;
  var errorMessage = null;

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
    window.map.clearElements();
    removeEventForm();
    window.filter.disableForm();
    show.src = 'img/muffin-grey.svg';
    photoContainer.removeChild(previewHouse[0]);
    mapPinMain.style.left = Coordinate.LEFT + 'px';
    mapPinMain.style.top = Coordinate.TOP + 'px';
    getMainPinStartCoordinates();
    window.movement.init(function () {
      var pinBoxElement = document.querySelector('.map__pins');
      addEventForm();
      window.filter.enableForm();
      var pins = window.data.get().slice(Amount.BEGIN, Amount.END);
      window.map.renderElements(pins, pinBoxElement, window.pin.createObjectIcon);
    });
  }

  function onResetForm() {
    changePage();
  }

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        show.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  function createNewPreviewHouse(result) {
    var imgContainer = previewHouse.cloneNode(true);
    var newElement = document.createElement('img');
    newElement.style.width = '70px';
    newElement.style.height = '70px';
    newElement.classList.add('ad-form__photo-img');
    newElement.src = result;
    newElement.alt = 'Фотография моего жилья';
    imgContainer.appendChild(newElement);
    return imgContainer;
  }

  fileChooserHouse.addEventListener('change', function () {
    var file = fileChooserHouse.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var readerHouse = new FileReader();
      readerHouse.addEventListener('load', function () {
        photoContainer.insertBefore(createNewPreviewHouse(readerHouse.result), previewHouse);
      });
      readerHouse.readAsDataURL(file);
    }
  });

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
    inputName.style.outline = 'none';
    inputName.style.border = '2px solid red';
  }

  function renderError(element, errorText) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'errorblock';
    var errorParagraph = document.createElement('p');
    errorParagraph.className = 'errorblock__paragraph';
    errorParagraph.textContent = errorText;

    errorDiv.appendChild(errorParagraph);
    element.insertAdjacentElement('afterEnd', errorDiv);

    element.addEventListener('focus', onErrorRemove);

    element.addEventListener('blur', onFocusRemove);
  }

  function onErrorRemove(evt) {
    evt.preventDefault();
    errorDiv.remove();
  }

  function onFocusRemove(evt) {
    onErrorRemove(evt);
    evt.target.style.border = 'none';
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  function renderSuccessMessage() {
    successMessage = successMessageTemplate.cloneNode(true);
    addMessage(successMessage);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessDocumentClick);
  }

  var onSuccessEscPress = window.util.isEscPress(deleteSuccessMessage);

  function onSuccessDocumentClick(evt) {
    evt.preventDefault();
    deleteSuccessMessage();
  }

  function deleteSuccessMessage() {
    deleteMessage(successMessage);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessDocumentClick);
  }

  function renderErrorMessage() {
    errorMessage = errorMessageTemplate.cloneNode(true);
    var closeButton = errorMessage.querySelector('.error__button');
    addMessage(errorMessage);
    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      deleteErrorMessage();
    });
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorDocumentClick);
  }
  var onErrorEscPress = window.util.isEscPress(deleteErrorMessage);

  function deleteErrorMessage() {
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorDocumentClick);
    deleteMessage(errorMessage);
  }

  function onErrorDocumentClick(evt) {
    evt.preventDefault();
    deleteErrorMessage();
  }

  function addMessage(blockMessage) {
    main.appendChild(blockMessage);
  }

  function deleteMessage(blockMessage) {
    main.removeChild(blockMessage);
  }

  function onLoad() {
    onResetForm();
    renderSuccessMessage();
  }

  function onError() {
    onResetForm();
    renderErrorMessage();
  }

  var housingTypes = Object.keys(TypeHousingMap);
  var valid = true;

  function onSubmitForm(evt) {
    evt.preventDefault();

    if (adForm.price) {
      for (var i = 0; i < housingTypes.length; i++) {
        if (typeHousing.value === housingTypes[i]) {
          if (adForm.price.value < TypeHousingMap[housingTypes[i]].MIN || adForm.price.value > TypeHousingMap[housingTypes[i]].MAX) {
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
      window.backend.upload(new FormData(adForm), onLoad, onError);
    }
  }

  window.form = {
    startWork: addEventForm,
  };
})();
