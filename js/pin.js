'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_PINS = 5;
  var pinsData = [];

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinsMap = document.querySelector('.map__pins');

  var getMapPin = function (item) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.addEventListener('click', function (evt) {
      window.adCard.appendAdCard(item);
      var selected = document.querySelector('.map__pin--active');
      if (selected) {
        selected.classList.remove('map__pin--active');
      }
      evt.currentTarget.classList.add('map__pin--active');
    });

    mapPin.style = 'left: ' + (item.location.x - PIN_WIDTH / 2) + 'px; top: ' + (item.location.y - PIN_HEIGHT) + 'px;';
    mapPin.querySelector('img').src = item.author.avatar;
    mapPin.querySelector('img').alt = item.offer.title;

    return mapPin;
  };

  var appendPins = function (items) {
    var arr = items.slice(0, MAX_PINS);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(getMapPin(arr[i]));
    }
    pinsMap.appendChild(fragment);
  };

  var onError = function (message) {
    window.error.show(message);
  };

  var onLoad = function (data) {
    pinsData = data;
    appendPins(pinsData);
  };

  var load = function () {
    window.backend.load(onLoad, onError);
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pinsMap.removeChild(pins[i]);
    }
  };

  var getPinsData = function () {
    return pinsData;
  };

  window.pin = {
    deletePins: deletePins,
    getPinsData: getPinsData,
    appendPins: appendPins,
    load: load
  };

})();
