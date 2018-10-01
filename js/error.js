'use strict';

(function () {

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');

    var show = function (message) {
      var errorMessage = errorTemplate.cloneNode(true);
      errorMessage.querySelector('.error__message').textContent = message;
      errorMessage.querySelector('.error__button').href = '123';

      main.appendChild(errorMessage);
    };

  window.error = {
    show: show
  };

})();
