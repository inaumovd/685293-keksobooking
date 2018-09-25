'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var getMapPin = function (item) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.addEventListener('click', function () {
      window.card.appendAd(item);
    });
    mapPin.style = 'left: ' + (item.location.x - PIN_WIDTH / 2) + 'px; top: ' + (item.location.y - PIN_HEIGHT) + 'px;';
    mapPin.querySelector('img').src = item.autor.avatar;
    mapPin.querySelector('img').alt = item.offer.title;

    return mapPin;
  };

  var appendPins = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(getMapPin(items[i]));
    }
    window.map.pinsMap.appendChild(fragment);
  };

  window.pin = {
    appendPins: appendPins
  };

})();
