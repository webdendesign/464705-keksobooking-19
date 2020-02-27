'use strict';
(function () {

  var main = document.querySelector('main');
  var form = main.querySelector('.ad-form');
  var elements = Array.from(form.elements);

  function changeForm() {
    elements.forEach(function (element) {
      element.disabled = form.classList.contains('ad-form--disabled') ? true : false;
    });
  }

  window.disabled = {
    changeForm: changeForm
  };

})();

