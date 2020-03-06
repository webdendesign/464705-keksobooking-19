'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var fileChooserHouse = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var previewHouse = photoContainer.querySelector('.ad-form__photo');

  function createNewPreviewHouse(result) {
    var imgContainer = previewHouse.cloneNode(true);
    var newElement = document.createElement('img');
    newElement.style.width = '70px';
    newElement.style.height = '70px';
    newElement.classList.add('ad-form__photo-img');
    newElement.src = result;
    newElement.alt = 'Фотография моего жилья';
    imgContainer.appendChild(newElement);
    return imgContainer;
  }

  fileChooserHouse.addEventListener('change', function () {
    var file = fileChooserHouse.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var readerHouse = new FileReader();
      readerHouse.addEventListener('load', function () {
        photoContainer.insertBefore(createNewPreviewHouse(readerHouse.result), previewHouse);
      });
      readerHouse.readAsDataURL(file);
    }
  });

})();
