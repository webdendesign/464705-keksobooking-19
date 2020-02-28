'use strict';
(function () {
  var errorBox = null;

  function renderError(element, errorText) {
    errorBox = document.createElement('div');
    errorBox.className = 'errorbox';
    var errorParagraph = document.createElement('p');
    errorParagraph.className = 'errorbox__paragraph';
    errorParagraph.textContent = errorText;

    errorBox.appendChild(errorParagraph);
    element.insertAdjacentElement('afterEnd', errorBox);

    element.addEventListener('focus', onErrorRemove);

    element.addEventListener('blur', onFocusRemove);
  }

  function onErrorRemove(evt) {
    evt.preventDefault();
    if (errorBox) {
      errorBox.remove();
    }
  }

  function onFocusRemove(evt) {
    onErrorRemove(evt);
    evt.target.style.border = 'none';
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
    inputName.style.outline = 'none';
    inputName.style.border = '2px solid red';
  }

  window.error = {
    renderError: renderError,
    changeInputStyle: changeInputStyle
  };

})();
