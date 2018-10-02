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
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onPageClick);
    main.appendChild(errorMessage);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onPageClick = function () {
    document.querySelector('main').removeChild(document.querySelector('.error'));
    document.removeEventListener('click', onPageClick);
  };

  window.error = {
    show: show,
  };

})();
