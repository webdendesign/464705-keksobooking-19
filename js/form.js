'use strict';
(function () {
  var RoomForGuests = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var BuildingMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var titleInput = adForm.querySelector('#title');
  var address = adForm.querySelector('#address');
  var typeHousing = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var submit = adForm.querySelector('.ad-form__submit');
  var reset = adForm.querySelector('.ad-form__reset');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var invalidElements = [];
  var successMessage = null;
  var errorMessage = null;

  function getStartCoordinat(coordinat) {
    address.value = coordinat.x + ', ' + coordinat.y;
  }

  function onChangeTypeHousing(evt) {
    var minPrice = BuildingMinPrice[evt.target.value];
    price.min = minPrice;
  }

  function onChangeTimeIn(evt) {
    timeOut.value = evt.target.value;
  }

  function onChangeTimeOut(evt) {
    timeIn.value = evt.target.value;
  }

  function disableСapacityOptions(inputValue) {
    var capacityOptions = guestNumber.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomForGuests[inputValue].forEach(function (it) {
      guestNumber.querySelector('option' + '[value="' + it + '"]').disabled = false;
      guestNumber.value = it;
    });
  }

  function highlightInvalidElement(item) {
    invalidElements.push(item);
    item.classList.add('invalid-element');
  }

  function unhighlightInvalidElement(item) {
    invalidElements.splice(invalidElements.indexOf(item), 1);
    item.classList.remove('invalid-element');
  }

  function onFormInvalid(evt) {
    highlightInvalidElement(evt.target);
  }

  function onCheckValidity(evt) {
    if (!evt.target.checkValidity()) {
      highlightInvalidElement(evt.target);
    } else if (invalidElements.indexOf(evt.target) !== 1) {
      unhighlightInvalidElement(evt.target);
    }
  }

  function checkNumber() {
    var roomGuests = RoomForGuests[roomNumber.value];
    var message = roomGuests.indexOf(+guestNumber.value) === -1 ? 'Количество гостей не влезут в выбранную комнату' : '';
    guestNumber.setCustomValidity(message);
  }

  function onChangeRoomNumber(evt) {
    evt.target.setCustomValidity('');
    disableСapacityOptions(roomNumber.value);
  }

  function onCapacitySelectChange(evt) {
    evt.target.setCustomValidity('');
  }

  function onSubmitClick() {
    checkNumber();
  }

  function onSuccessEscPress(evt) {
    window.util.onEscPress(evt, deleteSuccessMessage);
  }

  function onSuccessDocumentClick() {
    deleteSuccessMessage();
  }

  function showSuccess() {
    successMessage = successMessageTemplate.cloneNode(true);
    addMessage(successMessage);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessDocumentClick);
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

  function onErrorEscPress(evt) {
    window.util.onEscPress(evt, deleteErrorMessage);
  }

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

  function onSubmitSuccess() {
    showSuccess();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
  }

  function onSubmitError() {
    renderErrorMessage();
  }

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(formData, onSubmitSuccess, onSubmitError);
  }

  function onResetClick(evt) {
    evt.preventDefault();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
    window.photo.remove();
  }

  function addEventForm() {
    adForm.addEventListener('invalid', onFormInvalid, true);
    price.addEventListener('change', onCheckValidity);
    titleInput.addEventListener('change', onCheckValidity);
    typeHousing.addEventListener('change', onChangeTypeHousing);
    timeIn.addEventListener('change', onChangeTimeIn);
    timeOut.addEventListener('change', onChangeTimeOut);
    roomNumber.addEventListener('change', onChangeRoomNumber);
    guestNumber.addEventListener('change', onCapacitySelectChange);
    submit.addEventListener('click', onSubmitClick);
    adForm.addEventListener('submit', onAdFormSubmit);
    reset.addEventListener('click', onResetClick);
  }

  function removeEventForm() {
    adForm.removeEventListener('invalid', onFormInvalid, true);
    price.removeEventListener('change', onCheckValidity);
    titleInput.removeEventListener('change', onCheckValidity);
    typeHousing.removeEventListener('change', onChangeTypeHousing);
    timeIn.removeEventListener('change', onChangeTimeIn);
    timeOut.removeEventListener('change', onChangeTimeOut);
    roomNumber.removeEventListener('change', onChangeRoomNumber);
    guestNumber.removeEventListener('change', onCapacitySelectChange);
    submit.removeEventListener('click', onSubmitClick);
    adForm.removeEventListener('submit', onAdFormSubmit);
    reset.removeEventListener('click', onResetClick);
  }

  function enableForm() {
    adForm.classList.remove('ad-form--disabled');
    adFormElement.forEach(function (it) {
      it.disabled = false;
    });
    adFormHeader.disabled = false;
    window.photo.enable();
    addEventForm();
  }

  function deactivateForm() {
    adForm.reset();
    adFormElement.forEach(function (it) {
      it.disabled = true;
    });
    adFormHeader.disabled = true;
    adForm.classList.add('ad-form--disabled');
    window.photo.deactivate();
    window.photo.remove();
    getStartCoordinat(window.map.getMainPin());
    removeEventForm();
  }

  deactivateForm();

  window.form = {
    getCoordinat: getStartCoordinat,
    startWork: enableForm
  };
})();
