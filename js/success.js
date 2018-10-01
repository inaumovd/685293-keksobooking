'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var main = document.querySelector('main');

  var show = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', window.success.escPress);
    document.addEventListener('click', window.success.onPageClickPress);
  };

  var escPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', escPress);
      document.removeEventListener('click', onPageClickPress);
    }
  };

  var onPageClickPress = function () {
    document.querySelector('main').removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onPageClickPress);
    document.removeEventListener('keydown', escPress);
  };

  window.success = {
    show: show,
    escPress: escPress,
    onPageClickPress: onPageClickPress
  };

})();
