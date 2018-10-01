'use strict';

(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');
  var errorButton;

  var show = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = message;
    errorButton = errorMessage.querySelector('.error__button');

    main.appendChild(errorMessage);
  };

  var escPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', escPress);
    }
  };

  var onPageClickPress = function () {
    document.querySelector('main').removeChild(document.querySelector('.error'));
    document.removeEventListener('click', onPageClickPress);
  };

  window.error = {
    show: show,
    escPress: escPress,
    onPageClickPress: onPageClickPress,
    errorButton: errorButton
  };

})();
