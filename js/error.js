'use strict';
(function () {
  var errorDiv = null;

  function changeInputStyle(inputName) {
    inputName.value = '';
    inputName.focus();
    inputName.style.outline = 'none';
    inputName.style.border = '2px solid red';
  }

  function renderError(element, errorText) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'errorblock';
    var errorParagraph = document.createElement('p');
    errorParagraph.className = 'errorblock__paragraph';
    errorParagraph.textContent = errorText;

    errorDiv.appendChild(errorParagraph);
    element.insertAdjacentElement('afterEnd', errorDiv);

    element.addEventListener('focus', onErrorRemove);

    element.addEventListener('blur', onFocusRemove);
  }

  function onErrorRemove(evt) {
    evt.preventDefault();
    errorDiv.remove();
  }

  function onFocusRemove(evt) {
    onErrorRemove(evt);
    evt.target.style.border = 'none';
    evt.target.removeEventListener('focus', onErrorRemove);
    evt.target.removeEventListener('blur', onFocusRemove);
  }

  window.error = {
    renderError: renderError,
    changeInputStyle: changeInputStyle
  };
})();
