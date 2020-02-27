'use strict';
(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var cardCurrent = null;
  var pinActive = null;

  var onEscPress = window.util.isEscPress(closeCardCurrent);
  var onCardCloseEnterPress = window.util.isEnterPress(closeCardCurrent);

  function closeCardCurrent() {
    if (cardCurrent) {
      pinActive.classList.remove('map__pin--active');
      pinActive.blur();
      cardCurrent.remove();
    }
  }

  function onCardCloseClick(evt) {
    evt.preventDefault();
    closeCardCurrent();
    document.removeEventListener('keydown', onEscPress);
  }

  function createPin(data) {
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

    function onPinClick() {
      openCardCurrent();
    }

    function openCardCurrent() {

      pinActiveClick();

      if (cardCurrent) {
        cardCurrent.remove();
      }

      cardCurrent = window.card.createCard(data);

      map.lastElementChild.insertAdjacentElement('beforeBegin', cardCurrent);

      var cardClose = cardCurrent.querySelector('.popup__close');

      cardClose.addEventListener('click', onCardCloseClick);
      cardClose.addEventListener('keydown', onCardCloseEnterPress);
      document.addEventListener('keydown', onEscPress);
    }

    var onOpenCardEnterPress = window.util.isEnterPress(openCardCurrent);

    pinElement.addEventListener('click', onPinClick);
    pinElement.addEventListener('keydown', onOpenCardEnterPress);

    return pinElement;
  }

  window.pin = {
    createAdPin: createPin,
    closeAdCurrent: closeCardCurrent
  };
})();
