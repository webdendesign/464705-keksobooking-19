'use strict';
(function () {
  var mapElems = [];

  // Функция отрисовки DOM-элементов

  function renderElements(arrPins, container, createElement) {
    var fragment = document.createDocumentFragment();
    if (Array.isArray(arrPins)) {
      arrPins.forEach(function (item) {
        var elemItem = createElement(item);
        fragment.appendChild(elemItem);
        mapElems.push(elemItem);
      });
      container.appendChild(fragment);
    } else {
      container.parentNode.insertBefore(fragment, container.nextElementSibling);
    }
  }

  function clearElements() {
    window.pin.closeCardCurrent();
    mapElems.forEach(function (item) {
      item.remove();
    });
    mapElems = [];
  }

  window.map = {
    renderElements: renderElements,
    clearElements: clearElements
  };
})();
