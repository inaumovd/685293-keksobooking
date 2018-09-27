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
    mapPin.querySelector('img').src = item.autor.avatar;
    mapPin.querySelector('img').alt = item.offer.title;

    return mapPin;
  };

  var appendPins = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      fragment.appendChild(getMapPin(items[i]));
    }
    pinsMap.appendChild(fragment);
  };

  var onError = function (message) {
    console.error(message);
  };

  var onLoad = function (data) {
    console.log(data); // данные есть
    pinsData = data;
    console.log(pinsData); //данные есть
  };

  window.backend.load(onLoad, onError);
  console.log(pinsData); //данных нет

  var show = function () {
    appendPins(pinsData);
  };

  window.pin = {
    show: show,
  };

})();
