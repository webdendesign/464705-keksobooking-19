'use strict';

(function () {
  var typeHouse = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function createCard(data) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + ' р' + '<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = typeHouse[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout + '.';
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    var features = cardElement.querySelector('.popup__features');
    var featureTemplate = features.querySelector('.popup__feature');
    features.innerHTML = '';
    data.offer.features.forEach(function (item) {
      var featureNewElement = featureTemplate.cloneNode();
      featureNewElement.className = '';
      featureNewElement.classList.add('popup__feature', 'popup__feature--' + item);
      features.appendChild(featureNewElement);
    });

    var photos = cardElement.querySelector('.popup__photos');
    var photoImgTemplate = photos.querySelector('.popup__photo');
    photos.innerHTML = '';
    data.offer.photos.forEach(function (src) {
      var photoElement = photoImgTemplate.cloneNode(true);
      photoElement.src = src;
      photos.appendChild(photoElement);
    });

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    return cardElement;
  }

  window.card = {
    createCard: createCard,
  };
})();
