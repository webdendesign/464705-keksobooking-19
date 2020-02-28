'use strict';
(function () {

  var map = document.querySelector('.map');
  var formElement = map.querySelector('.map__filters');
  var filterFormElements = Array.from(formElement.elements);

  function changeConditionFilterForm() {
    filterFormElements.forEach(function (filterFormElement) {
      filterFormElement.disabled = map.classList.contains('map--faded') ? true : false;
    });
  }

  changeConditionFilterForm();

  function addEventFilterForm() {
    map.classList.remove('map--faded');
    changeConditionFilterForm();
    formElement.addEventListener('change', window.filterPin.onChangeFilter);
  }

  function removeEventFilterForm() {
    formElement.reset();
    map.classList.add('map--faded');
    changeConditionFilterForm();
    formElement.removeEventListener('change', window.filterPin.onChangeFilter);
  }

  window.filter = {
    enableFilterForm: addEventFilterForm,
    disableFilterForm: removeEventFilterForm
  };
})();
