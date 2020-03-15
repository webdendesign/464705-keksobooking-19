'use strict';
(function () {
  var PressKey = {
    ESC_KEY: 27,
    ENTER_KEY: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  function onEnterPress(evt, cb) {
    if (evt.keyCode === PressKey.ENTER_KEY) {
      cb();
    }
  }

  function onEscPress(evt, cb) {
    if (evt.keyCode === PressKey.ESC_KEY) {
      cb();
    }
  }

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    onEnterPress: onEnterPress,
    onEscPress: onEscPress,
    debounce: debounce
  };
})();

