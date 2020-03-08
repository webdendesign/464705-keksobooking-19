'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var TypeHouse = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var cardCurrent = null;
  var pinActive = null;

  function closeCardCurrent() {
    if (cardCurrent) {
      pinActive.classList.remove('map__pin--active');
      pinActive.blur();
      cardCurrent.remove();
    }
  }

  function createObjectIcon(data) {
    if (!data.offer) {
      return false;
    }
    var pinElement = pinTemplate.cloneNode(true);
    var image = pinElement.querySelector('img');
    pinElement.style.left = data.location.x + 'px';
    pinElement.style.top = data.location.y + 'px';
    image.src = data.author.avatar;
    image.alt = data.offer.title;

    function pinActiveClick() {
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
      pinActive = pinElement;
      pinActive.classList.add('map__pin--active');
    }

    var onPopupEscPress = function (evt) {
      if (evt.key === ESC_KEY) {
        closeCurrentCard();
      }
    };

    var closeCurrentCard = function () {
      cardCurrent.remove();
      pinActive.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    function openCurrentCard() {
      pinActiveClick();

      if (cardCurrent) {
        cardCurrent.remove();
      }

      cardCurrent = createCard(data);
      map.lastElementChild.insertAdjacentElement('beforeBegin', cardCurrent);
      var cardClose = cardCurrent.querySelector('.popup__close');
      document.addEventListener('keydown', onPopupEscPress);

      cardClose.addEventListener('click', function () {
        closeCurrentCard();
      });

      cardClose.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          closeCurrentCard();
        }
      });
    }

    pinElement.addEventListener('click', function () {
      openCurrentCard();
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        openCurrentCard();
      }
    });
    return pinElement;
  }

  function createCard(data) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').innerHTML = data.offer.price + ' р/ночь';
    card.querySelector('.popup__type').textContent = TypeHouse[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout + '.';
    card.querySelector('.popup__description').textContent = data.offer.description;

    var features = card.querySelector('.popup__features');
    var featureTemplate = features.querySelector('.popup__feature');
    features.innerHTML = '';
    data.offer.features.forEach(function (item) {
      var featureNewElement = featureTemplate.cloneNode();
      featureNewElement.className = '';
      featureNewElement.classList.add('popup__feature', 'popup__feature--' + item);
      features.appendChild(featureNewElement);
    });

    var photos = card.querySelector('.popup__photos');
    var photoImgTemplate = photos.querySelector('.popup__photo');
    photos.innerHTML = '';
    data.offer.photos.forEach(function (src) {
      var photoElement = photoImgTemplate.cloneNode(true);
      photoElement.src = src;
      photos.appendChild(photoElement);
    });

    card.querySelector('.popup__avatar').src = data.author.avatar;

    return card;
  }

  window.pin = {
    createObjectIcon: createObjectIcon,
    closeCardCurrent: closeCardCurrent
  };
})();
