'use strict';

(function () {

  function use(func, wait, immediate) {
    var timeout;
    return function () {
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(use(), args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(use(), args);
      }
    };
  }

  window.debounce = {
    use: use
  };

})();
