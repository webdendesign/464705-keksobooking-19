'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var fileChooser = adForm.querySelector('.ad-form__field input[type=file]');
  var show = adForm.querySelector('.ad-form-header__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        show.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

})();
