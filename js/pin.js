'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinsData = [];

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinsMap = document.querySelector('.map__pins');

  var getMapPin = function (item) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.addEventListener('click', function () {
      window.adCard.appendAdCard(item);
    });
    mapPin.style = 'left: ' + (item.location.x - PIN_WIDTH / 2) + 'px; top: ' + (item.location.y - PIN_HEIGHT) + 'px;';
    mapPin.querySelector('img').src = item.author.avatar;
    mapPin.querySelector('img').alt = item.offer.title;

    return mapPin;
  };

  var appendPins = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(getMapPin(items[i]));
    }
    pinsMap.appendChild(fragment);
  };

  var onError = function (message) {
    window.error.show(message);
  };

  var onLoad = function (data) {
    pinsData = data;
  };

  window.backend.load(onLoad, onError);

  var show = function () {
    appendPins(pinsData);
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pinsMap.removeChild(pins[i]);
    }
  };

  window.pin = {
    show: show,
    deletePins: deletePins
  };

})();
