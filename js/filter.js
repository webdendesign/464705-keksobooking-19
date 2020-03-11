'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var Price = {
    PRICE_MIN: 10000,
    PRICE_MAX: 50000
  };
  var BEGIN = 0;
  var END = 5;

  var FilterCriteria = {
    housingType: 'any',
    housingPrice: 'any',
    housingRoom: 'any',
    housingGuest: 'any'
  };

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var filterElements = Array.from(mapFilter.elements);

  function changeConditionFilterForm() {
    filterElements.forEach(function (filterElement) {
      filterElement.disabled = map.classList.contains('map--faded') ? true : false;
    });
  }

  changeConditionFilterForm();

  function updateHousingTypeFilter(value) {
    FilterCriteria.housingType = value;
    return FilterCriteria.housingType;
  }

  function updateHousingPriceFilter(value) {
    FilterCriteria.housingPrice = value;
    return FilterCriteria.housingPrice;
  }

  function updateHousingRoomsFilter(value) {
    FilterCriteria.housingRoom = value;
    return FilterCriteria.housingRoom;
  }

  function updateHousingGuestsFilter(value) {
    FilterCriteria.housingGuest = value;
    return FilterCriteria.housingGuest;
  }

  function updateHousingFeatureFilter(value) {
    // если массив существует и включает в себя значение value
    if (FilterCriteria.housingFeature && FilterCriteria.housingFeature.includes(value)) {
      // удаляем это значение из массива
      FilterCriteria.housingFeature.splice(FilterCriteria.housingFeature.indexOf(value), 1);

      // если массив не имеет длины
      if (!FilterCriteria.housingFeature.length) {
        // удаляем свойство из объекта
        delete FilterCriteria.housingFeature;
      }
    } else {
      // иначе свойство равно самому себе или пустому массиву
      FilterCriteria.housingFeature = FilterCriteria.housingFeature || [];
      // пушим в него значение value
      FilterCriteria.housingFeature.push(value);
    }
    return FilterCriteria.housingFeature;

  }
  function housingTypeFilter(adObject) {
    var result = true;
    if (FilterCriteria.housingType !== 'any') {
      result = FilterCriteria.housingType === adObject.offer.type;
    }
    return result;
  }

  function housingPriceFilter(adObject) {
    var result = true;
    if (FilterCriteria.housingPrice !== 'any') {
      switch (FilterCriteria.housingPrice) {
        case 'middle':
          result = adObject.offer.price >= Price.PRICE_MIN && adObject.offer.price <= Price.PRICE_MAX;
          break;
        case 'low':
          result = adObject.offer.price < Price.PRICE_MIN;
          break;
        case 'high':
          result = adObject.offer.price > Price.PRICE_MAX;
          break;
        default:
          break;
      }
    }
    return result;
  }

  function housingRoomFilter(adObject) {
    var result = true;
    if (FilterCriteria.housingRoom !== 'any') {
      result = FilterCriteria.housingRoom === adObject.offer.rooms;
    }
    return result;
  }

  function housingGuestFilter(adObject) {
    var result = true;
    if (FilterCriteria.housingGuest !== 'any') {
      result = FilterCriteria.housingGuest === adObject.offer.guests;
    }
    return result;
  }

  function housingFeatureFilter(adObject) {
    // перебираем каждое добавленное значение массива преимуществ
    return (FilterCriteria.housingFeature || []).every(function (value) {
      // если хотя бы одно из значений не входит в массив преимуществ фильтруемых пинов, пин не включается в отфильтрованный массив
      var result = true;
      var indexFeature = adObject.offer.features.indexOf(value);
      var valueFeature = adObject.offer.features[indexFeature];
      result = FilterCriteria.housingFeature.includes(valueFeature);
      return result;
    });
  }

  var lastTimeout = null;

  function debounce(cb) {
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  function onChangeFilter(evt) {
    evt.preventDefault();
    var pins = window.data.get();
    var pinBoxElement = document.querySelector('.map__pins');
    var value = isNaN(evt.target.value) ? evt.target.value : parseInt(evt.target.value, 10);

    if (evt.target.name === 'housing-type') {
      updateHousingTypeFilter(value);
    }

    if (evt.target.name === 'housing-price') {
      updateHousingPriceFilter(value);
    }

    if (evt.target.name === 'housing-rooms') {
      updateHousingRoomsFilter(value);
    }

    if (evt.target.name === 'housing-guests') {
      updateHousingGuestsFilter(value);
    }

    if (evt.target.name === 'features') {
      updateHousingFeatureFilter(value);
    }

    var filteredPins = pins.filter(function (pin) {
      return housingTypeFilter(pin) && housingPriceFilter(pin) && housingRoomFilter(pin) && housingGuestFilter(pin) && housingFeatureFilter(pin);
    }).slice(BEGIN, END);

    window.map.clearElements();
    debounce(window.map.renderElements)(filteredPins, pinBoxElement, window.pin.createObjectIcon);
  }

  function addEventForm() {
    map.classList.remove('map--faded');
    changeConditionFilterForm();
    mapFilter.addEventListener('change', onChangeFilter);
  }

  function removeEventForm() {
    mapFilter.reset();
    map.classList.add('map--faded');
    changeConditionFilterForm();
    mapFilter.removeEventListener('change', onChangeFilter);
  }

  window.filter = {
    enableForm: addEventForm,
    disableForm: removeEventForm
  };
})();
