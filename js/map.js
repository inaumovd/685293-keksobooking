'use strict';

(function () {

  var MAX_Y_COORD = 630;
  var MIN_Y_COORD = 130;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var MAIN_PIN_LEFT_COORD = '570px';
  var MAIN_PIN_TOP_COORD = '375px';

  var map = document.querySelector('.map');
  var pinsMap = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var initMainPinLeft = mainPin.offsetLeft;
  var initMainPinTop = mainPin.offsetTop;

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.activate();
    window.pin.show();
  };

  var resetMainPin = function () {
    mainPin.style.left = initMainPinLeft + 'px';
    mainPin.style.top = initMainPinTop + 'px';
  };

  var deactivatePage = function () {
    window.pin.deletePins();
    window.form.deactivate();
    window.form.setAddress(getMainPinCoordinate());
    resetMainPin();
    map.classList.add('map--faded');
  };

  var getMainPinCoordinate = function () {
    var x = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var y = mainPin.offsetTop + MAIN_PIN_HEIGHT;
    return x + ',' + y;
  };

  var isPageNotActive = function () {
    return map.classList.contains('map--faded');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var minX = 0 - MAIN_PIN_WIDTH / 2;
    var maxX = pinsMap.offsetWidth - MAIN_PIN_WIDTH / 2;
    var minY = MIN_Y_COORD - MAIN_PIN_HEIGHT;
    var maxY = MAX_Y_COORD - MAIN_PIN_HEIGHT;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var calcXCoord = mainPin.offsetLeft - shift.x;
      var calcYCoord = mainPin.offsetTop - shift.y;

      var nextX = Math.min(Math.max(calcXCoord, minX), maxX);
      var nextY = Math.min(Math.max(calcYCoord, minY), maxY);

      mainPin.style.left = nextX + 'px';
      mainPin.style.top = nextY + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (isPageNotActive()) {
        activatePage();
      }

      window.form.setAddress(getMainPinCoordinate());

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  deactivatePage();

  window.map = {
    MAX_Y_COORD: MAX_Y_COORD,
    MIN_Y_COORD: MIN_Y_COORD,
    pinsMap: pinsMap,
    deactivatePage: deactivatePage
  };

})();
