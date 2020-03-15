'use strict';
(function () {
  var FilterPin = {
    BEGIN: 0,
    END: 5
  };

  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var SelectValue = {
    ANY: 'any',
    TYPE: 'type',
    ROOMS: 'rooms',
    GUESTS: 'guests'
  };

  var mapFilter = document.querySelector('.map__filters');
  var filterElement = mapFilter.querySelectorAll('select, input');
  var housingType = mapFilter.querySelector('#housing-type');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingRoom = mapFilter.querySelector('#housing-rooms');
  var housingGuest = mapFilter.querySelector('#housing-guests');
  var housingFeatures = mapFilter.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  function filtrationItem(it, item, key) {
    return it.value === SelectValue.ANY ? true : it.value === item[key].toString();
  }

  function filtrationByType(item) {
    return filtrationItem(housingType, item.offer, SelectValue.TYPE);
  }

  function filtrationByPrice(item) {
    var filteringPrice = PriceRange[housingPrice.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  }

  function filtrationByRooms(item) {
    return filtrationItem(housingRoom, item.offer, SelectValue.ROOMS);
  }

  function filtrationByGuests(item) {
    return filtrationItem(housingGuest, item.offer, SelectValue.GUESTS);
  }

  function filtrationByFeatures(item) {
    var checkedFeaturesItems = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  var onFilterChange = window.util.debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.map.removePins();
    window.map.removeCard();
    window.map.renderPins(filteredData.slice(FilterPin.BEGIN, FilterPin.END));
  });

  function activateFilter() {
    filterElement.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    mapFilter.addEventListener('change', onFilterChange);
  }

  function resetFilter() {
    filterElement.forEach(function (it) {
      it.value = SelectValue.ANY;
    });
    var featuresItems = housingFeatures.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function deactivateFilter() {
    filterElement.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    mapFilter.removeEventListener('change', onFilterChange);
  }

  function filtrationLaunch(dataFilter) {
    data = dataFilter.slice(0);
    activateFilter();
    return dataFilter.slice(FilterPin.BEGIN, FilterPin.END);
  }

  function filtrationDeactivate() {
    deactivateFilter();
  }

  window.filter = {
    launch: filtrationLaunch,
    deactivate: filtrationDeactivate
  };
})();
