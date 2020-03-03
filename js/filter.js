'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var filterElements = Array.from(mapFilter.elements);

  function changeConditionFilterForm() {
    filterElements.forEach(function (filterElement) {
      filterElement.disabled = map.classList.contains('map--faded') ? true : false;
    });
  }

  changeConditionFilterForm();

  function addEventFilterForm() {
    map.classList.remove('map--faded');
    changeConditionFilterForm();
    mapFilter.addEventListener('change', window.filterPin.onChangeFilter);
  }

  function removeEventFilterForm() {
    mapFilter.reset();
    map.classList.add('map--faded');
    changeConditionFilterForm();
    mapFilter.removeEventListener('change', window.filterPin.onChangeFilter);
  }

  window.filter = {
    enableFilterForm: addEventFilterForm,
    disableFilterForm: removeEventFilterForm
  };
})();
