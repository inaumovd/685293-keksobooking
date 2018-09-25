'use strict';

(function () {

  // var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getRandomItem = function (items) {
    return items[getRandomInt(0, items.length - 1)];
  };

  var randomCompare = function () {
    return Math.random() - 0.5;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeAd();
    }
  };

  window.utils = {
    // ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    randomCompare: randomCompare,
    onPopupEscPress: onPopupEscPress
  };

})();
