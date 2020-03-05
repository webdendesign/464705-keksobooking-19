'use strict';
(function () {
  var main = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorMessage = null;

  function renderErrorMessage() {
    errorMessage = errorMessageTemplate.cloneNode(true);
    var closeButton = errorMessage.querySelector('.error__button');
    addMessage(errorMessage);
    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      deleteErrorMessage();
    });
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorDocumentClick);
  }
  var onErrorEscPress = window.util.isEscPress(deleteErrorMessage);

  function deleteErrorMessage() {
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorDocumentClick);
    deleteMessage(errorMessage);
  }

  function onErrorDocumentClick(evt) {
    evt.preventDefault();
    deleteErrorMessage();
  }

  function addMessage(blockMessage) {
    main.appendChild(blockMessage);
  }

  function deleteMessage(blockMessage) {
    main.removeChild(blockMessage);
  }

  window.messageError = {
    renderErrorMessage: renderErrorMessage
  };
})();
