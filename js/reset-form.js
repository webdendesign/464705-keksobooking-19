'use strict';
(function () {
  var Coordinate = {
    LEFT: 570,
    TOP: 375
  };

  var main = document.querySelector('main');
  var mapPinMain = main.querySelector('.map__pin--main');
  var adForm = main.querySelector('.ad-form');

  function changePage() {
    adForm.reset();
    window.map.clearMap();
    window.form.resetForm();
    window.filter.disableFilterForm();
    mapPinMain.style.left = Coordinate.LEFT + 'px';
    mapPinMain.style.top = Coordinate.TOP + 'px';
    window.formCoordinate.getMainPinStartCoordinates();
    window.movement.init(function () {
      var pinBoxElement = document.querySelector('.map__pins');
      window.form.startForm();
      window.filter.enableFilterForm();
      var pins = window.data.get().slice(0, 5);
      window.map.renderElements(pins, pinBoxElement, window.pin.createAdPin);
    });
  }

  window.resetForm = {
    onResetForm: changePage
  };

})();
