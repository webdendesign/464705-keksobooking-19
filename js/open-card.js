// 'use strict';
// (function () {

//   var pinElem = window.pin.createAdPin(data);
//   var map = document.querySelector('.map');

//   var cardCurrent = null;
//   var pinActive = null;

//   var onEscPress = window.util.isEscPress(closeCardCurrent);
//   var onCloseCardEnterPress = window.util.isEnterPress(closeCardCurrent);

//   function closeCardCurrent() {
//     if (cardCurrent) {
//       pinActive.classList.remove('map__pin--active');
//       pinActive.blur();
//       cardCurrent.remove();
//     }
//   }

//   function onCardCloseClick(evt) {
//     evt.preventDefault();
//     closeCardCurrent();
//     document.removeEventListener('keydown', onEscPress);
//   }

//   function onPinClick() {
//     openCardCurrent();
//   }

//   function openCardCurrent() {
//     if (cardCurrent) {
//       cardCurrent.remove();
//     }

//     cardCurrent = window.card.createCard(data);

//     if (pinActive) {
//       pinActive.classList.remove('map__pin--active');
//     }
//     pinActive = pinElem;
//     pinActive.classList.add('map__pin--active');
//     map.lastElementChild.insertAdjacentElement('beforeBegin', cardCurrent);

//     var cardClose = cardCurrent.querySelector('.popup__close');

//     cardClose.addEventListener('click', onCardCloseClick);
//     cardClose.addEventListener('keydown', onCloseCardEnterPress);
//     document.addEventListener('keydown', onEscPress);
//   }

//   var onOpenCardEnterPress = window.util.isEnterPress(openCardCurrent);

//   pinElem.addEventListener('click', onPinClick);
//   pinElem.addEventListener('keydown', onOpenCardEnterPress);


//   window.pin = {
//     closeAdCurrent: closeCardCurrent
//   };
// })();
