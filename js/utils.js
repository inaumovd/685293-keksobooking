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

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(debounce(), args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(debounce(), args);
      }
    };
  }

  window.utils = {
    // ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    getRandomInt: getRandomInt,
    getRandomItem: getRandomItem,
    randomCompare: randomCompare,
    debounce: debounce
  };

})();
