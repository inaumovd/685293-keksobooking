'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var main = document.querySelector('main');

  var show = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
  }

  var escPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', escPress);
    }
  };

  var onPageClickPress = function {
    document.querySelector('main').removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onPageClickPress);
  };

  window.success = {
    show: show
  };

})();
