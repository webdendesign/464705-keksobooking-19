'use strict';
(function () {
  var TypeHouse = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  window.card = createCard;
})();
