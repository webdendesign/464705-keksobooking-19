'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_PHOTO = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarShow = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var houseChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');

  function filtrationByCorrectType(file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  }

  function changeAvatar(src) {
    avatarShow.src = src;
  }

  function removeEmptyImg() {
    var emptyImg = document.querySelector('.ad-form__photo--empty');
    if (emptyImg) {
      emptyImg.remove();
    }
  }

  function createNewPreviewHouse(result) {
    var newDiv = document.createElement('div');
    var image = document.createElement('img');
    newDiv.classList.add('ad-form__photo');
    newDiv.classList.add('ad-form__photo--added');
    image.src = result;
    image.style.width = '70px';
    image.style.height = '70px';
    image.style.alt = 'Фотографии жилья';
    newDiv.appendChild(image);
    photoContainer.appendChild(newDiv);
    removeEmptyImg();
  }

  function addEmptyImg() {
    if (!document.querySelector('.ad-form__photo--empty')) {
      var emptyImg = document.createElement('div');
      emptyImg.classList.add('ad-form__photo');
      emptyImg.classList.add('ad-form__photo--empty');
      photoContainer.appendChild(emptyImg);
    }
  }

  function loadFile(chooser, func) {
    var matches = Array.from(chooser.files).filter(filtrationByCorrectType);
    if (matches) {
      matches.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  }

  function removeImage() {
    avatarShow.src = DEFAULT_PHOTO;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImg();
  }

  function onAvatarChange(evt) {
    loadFile(evt.target, changeAvatar);
  }

  function onHouseChange(evt) {
    loadFile(evt.target, createNewPreviewHouse);
  }

  function enableImage() {
    avatarChooser.addEventListener('change', onAvatarChange);
    houseChooser.addEventListener('change', onHouseChange);
  }

  function deactivateImage() {
    avatarChooser.removeEventListener('change', onAvatarChange);
    houseChooser.removeEventListener('change', onHouseChange);
  }

  window.photo = {
    enable: enableImage,
    deactivate: deactivateImage,
    remove: removeImage
  };
})();
