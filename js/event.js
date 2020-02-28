'use strict';
(function () {

  var mapMain = document.querySelector('.map');
  var mapPins = mapMain.querySelector('.map__pins');
  var mapPin = mapPins.querySelectorAll('.map__pin');

  var cardCurrent = null;
  var pinActive = null;

  var onEscPress = window.util.isEscPress(closeCardCurrent);
  var onCloseCardEnterPress = window.util.isEnterPress(closeCardCurrent);

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

  var pinActiveClick = function () {
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
    pinActive = window.pin.createAdPin;
    pinActive.classList.add('map__pin--active');
  };

  var onPinClick = function () {
    openCardCurrent();
  };

  function openCardCurrent() {

    pinActiveClick();

    if (cardCurrent) {
      cardCurrent.remove();
    }

    cardCurrent = window.card.createCard(window.data.set);

    mapMain.lastElementChild.insertAdjacentElement('beforeBegin', cardCurrent);

    var cardClose = cardCurrent.querySelector('.popup__close');

    cardClose.addEventListener('click', onCardCloseClick);
    cardClose.addEventListener('keydown', onCloseCardEnterPress);
    document.addEventListener('keydown', onEscPress);
  }

  // var onOpenCardEnterPress = window.util.isEnterPress(openCardCurrent);

  for (var i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', function () {
      onPinClick();
    });
  }

})();
