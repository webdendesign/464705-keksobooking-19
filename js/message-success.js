'use strict';
(function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

  var successMessage = null;

  function renderSuccessMessage() {
    successMessage = successMessageTemplate.cloneNode(true);
    addMessage(successMessage);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessDocumentClick);
  }

  var onSuccessEscPress = window.util.isEscPress(deleteSuccessMessage);

  function onSuccessDocumentClick(evt) {
    evt.preventDefault();
    deleteSuccessMessage();
  }

  function deleteSuccessMessage() {
    deleteMessage(successMessage);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessDocumentClick);
  }

  function addMessage(blockMessage) {
    main.appendChild(blockMessage);
  }

  function deleteMessage(blockMessage) {
    main.removeChild(blockMessage);
  }

  window.messageSuccess = {
    renderSuccessMessage: renderSuccessMessage
  };
})();
