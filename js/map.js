'use strict';

(function () {
  var MainPin = {
    X: 602,
    Y: 400
  };

  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 16
  };

  var Ordinate = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var TypeHouse = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card');
  var contentCard = cardTemplate.content.querySelector('.map__card');
  var popupPhoto = cardTemplate.content.querySelector('.popup__photo');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFilter = mapFiltersContainer.querySelectorAll('.map__filter');
  var housingFeatures = mapFiltersContainer.querySelector('#housing-features');
  var activePage = false;

  function removePins() {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  }

  function removeCard() {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  }

  function activateFilter() {
    mapFilter.forEach(function (it) {
      it.disabled = false;
    });
    housingFeatures.disabled = false;
  }

  function deactivateFilter() {
    mapFilter.forEach(function (it) {
      it.disabled = true;
    });
    housingFeatures.disabled = true;
  }

  function createPin(data) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = data.author.avatar;
    pin.style.left = data.location.x + 'px';
    pin.style.top = data.location.y + 'px';
    pin.querySelector('img').alt = data.offer.title;
    function onPinClick() {
      var cardPrevious = map.querySelector('.map__card');
      if (cardPrevious) {
        cardPrevious.remove();
      }
      createCard(data);
    }

    pin.addEventListener('click', onPinClick);
    return pin;
  }

  function renderPins(dataPin) {
    var samplePin = document.createDocumentFragment();
    dataPin.forEach(function (it) {
      samplePin.appendChild(createPin(it));
    });
    mapPins.appendChild(samplePin);
  }

  function createFeature(dataFeature) {
    var featureFragment = document.createDocumentFragment();
    dataFeature.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  }

  function createPhotosFragment(dataPhoto) {
    var photosFragment = document.createDocumentFragment();
    dataPhoto.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  }

  function createCard(data) {
    var card = contentCard.cloneNode(true);
    card.querySelector('.map__card img').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--price').textContent = data.offer.price + ' /ночь';
    card.querySelector('.popup__type').textContent = TypeHouse[data.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(createFeature(data));
    card.querySelector('.popup__description').textContent = data.offer.description;
    card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photo'));
    card.querySelector('.popup__photos').appendChild(createPhotosFragment(data));
    mapFiltersContainer.insertAdjacentElement('beforeBegin', card);
    var closePopup = card.querySelector('.popup__close');

    function closeCard() {
      card.remove();
      closePopup.removeEventListener('click', onCloseClickCard);
      document.removeEventListener('keydown', onEscPressCard);
    }

    function onCloseClickCard() {
      closeCard();
    }

    closePopup.addEventListener('click', onCloseClickCard);

    function onEscPressCard(evt) {
      window.util.onEscPress(evt, closeCard);
    }

    document.addEventListener('keydown', onEscPressCard);
    return card;
  }

  function onMainPinMouseClick(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mainPinPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };
      var Border = {
        TOP: Ordinate.Y.MIN - mapPinMain.offsetHeight - PinSize.TAIL,
        BOTTOM: Ordinate.Y.MAX - mapPinMain.offsetHeight - PinSize.TAIL,
        LEFT: Ordinate.X.MIN,
        RIGHT: Ordinate.X.MAX - mapPinMain.offsetWidth
      };
      if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
        mapPinMain.style.left = mainPinPosition.x + 'px';
      }
      if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
        mapPinMain.style.top = mainPinPosition.y + 'px';
      }
      var pinTailCoords = {
        x: mainPinPosition.x + Math.ceil(PinSize.WIDTH / 2),
        y: mainPinPosition.y + PinSize.HEIGHT + PinSize.TAIL
      };
      window.form.getCoordinat(pinTailCoords);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (!activePage) {
        activateMap();
        window.form.startWork();
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function getMainPinStartCoordinates() {
    return {
      x: MainPin.X,
      y: MainPin.Y
    };
  }

  function onSuccessLoadBlock(dataFilter) {
    window.filter.launch(dataFilter);
  }

  function onErrorLoadBlock(errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-block');
    errorBlock.style.width = '100%';
    errorBlock.style.border = '1px solid orange';
    errorBlock.style.backgroundColor = 'yellow';
    errorBlock.style.textAlign = 'center';
    errorBlock.textContent = errorMessage;
    map.insertAdjacentElement('afterbegin', errorBlock);
  }

  function activateMap() {
    map.classList.remove('map--faded');
    window.backend.load(onSuccessLoadBlock, onErrorLoadBlock);
    activateFilter();
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    removePins();
    removeCard();
    mapPinMain.style.top = MainPin.Y - PinSize.HEIGHT / 2 + 'px';
    mapPinMain.style.left = MainPin.X - PinSize.WIDTH / 2 + 'px';
    deactivateFilter();
    activePage = false;
  }

  function startApp() {
    deactivateMap();
    mapPinMain.addEventListener('mousedown', onMainPinMouseClick);
  }

  startApp();

  window.map = {
    getMainPin: getMainPinStartCoordinates,
    deactivate: deactivateMap,
    removePins: removePins,
    removeCard: removeCard,
    renderPins: renderPins
  };
})();
