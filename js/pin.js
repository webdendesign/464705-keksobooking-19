'use strict';
(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

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

    var onPopupEscPress = function (evt) {
      if (evt.key === ESC_KEY) {
        closePopup();
      }
    };

    var closePopup = function () {
      cardCurrent.remove();
      pinActive.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    function openPopup() {
      pinActiveClick();

      if (cardCurrent) {
        cardCurrent.remove();
      }

      cardCurrent = window.card.createCard(data);

      map.lastElementChild.insertAdjacentElement('beforeBegin', cardCurrent);

      var cardClose = cardCurrent.querySelector('.popup__close');
      document.addEventListener('keydown', onPopupEscPress);

      cardClose.addEventListener('click', function () {
        closePopup();
      });

      cardClose.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          closePopup();
        }
      });
    }

    pinElement.addEventListener('click', function () {
      openPopup();
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        openPopup();
      }
    });

    return pinElement;
  }

  window.pin = {
    createAdPin: createPin,
    closeAdCurrent: closeCardCurrent
  };
})();
