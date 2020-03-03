'use strict';
(function () {
  var Ordinate = {
    MIN: 130,
    MAX: 630
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var mainPinWidth = mapPinMain.getBoundingClientRect().width;
  var mainPinHeight = mapPinMain.getBoundingClientRect().height;

  function getCoordinates() {
    var pinMoveEvent = new Event('pinMoveEvent', {
      bubbles: true,
      cancelable: true
    });
    pinMoveEvent.coords = {
      x: mapPinMain.offsetLeft + mainPinWidth / 2,
      y: mapPinMain.offsetTop + mainPinHeight
    };
    if (map.classList.contains('map--faded')) {
      pinMoveEvent.coords.y = mapPinMain.offsetTop + mainPinHeight / 2;
    }
    document.dispatchEvent(pinMoveEvent);
  }

  function onMouseDown(evt) {
    evt.preventDefault();
    // запоминаем координаты точки, с которой начинаем перемещать пин

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // обновляем смещение относительно первоначальной точки
    function onMouseMove(moveEvt) {
      evt.preventDefault();
      getCoordinates();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinLeft = mapPinMain.offsetLeft - shift.x;
      var pinTop = mapPinMain.offsetTop - shift.y;

      if (pinLeft < mapPins.offsetLeft - mainPinWidth / 2 || pinLeft > mapPins.offsetWidth - mainPinWidth / 2) {
        return;
      }
      if (pinTop < Ordinate.MIN || pinTop > Ordinate.MAX) {
        return;
      }

      mapPinMain.style.left = pinLeft + 'px';
      mapPinMain.style.top = pinTop + 'px';
    }

    // при отпускании мыши перестаем слушать событие движения мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      getCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.movement = {
    init: function (cb) {
      mapPinMain.addEventListener('mousedown', onMouseDown);
      function onStartApp() {
        mapPinMain.removeEventListener('mouseup', onStartApp);
        mapPinMain.removeEventListener('keydown', onPinInitEnterPress);
        cb();
      }
      mapPinMain.addEventListener('mouseup', onStartApp);
      var onPinInitEnterPress = window.util.isEnterPress(onStartApp);
      mapPinMain.addEventListener('keydown', onPinInitEnterPress);
    }
  };
})();

