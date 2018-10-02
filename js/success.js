'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var main = document.querySelector('main');

  var show = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onPageClick);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onPageClick);
    }
  };

  var onPageClick = function () {
    document.querySelector('main').removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onPageClick);
    document.removeEventListener('keydown', onEscPress);
  };

  window.success = {
    show: show,
  };

})();
