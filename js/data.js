'use strict';

(function () {

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  var getItem = function (number) {
    var x = window.utils.getRandomInt(0, window.map.pinsMap.offsetWidth);
    var y = window.utils.getRandomInt(window.map.MIN_Y_COORD, window.map.MAX_Y_COORD);
    var item = {
      autor: {
        avatar: 'img/avatars/user0' + (number + 1) + '.png'
      },
      offer: {
        title: TITLES[number],
        address: x + ', ' + y,
        price: window.utils.getRandomInt(MIN_PRICE, MAX_PRICE),
        type: window.utils.getRandomItem(TYPES),
        rooms: window.utils.getRandomInt(1, 5),
        guests: window.utils.getRandomInt(1, 10),
        checkin: window.utils.getRandomItem(TIMES),
        checkout: window.utils.getRandomItem(TIMES),
        features: FEATURES.slice(window.utils.getRandomInt(0, FEATURES.length - 1)),
        description: '',
        photos: PHOTOS.slice().sort(window.utils.randomCompare)
      },
      location: {
        x: x,
        y: y
      }
    };
    return item;
  };

  var getItemsList = function (quantity) {
    var itemsList = [];
    for (var i = 0; i < quantity; i++) {
      itemsList[i] = getItem(i);
    }
    return itemsList;
  };

  window.data = {
    getItemsList: getItemsList
  };

})();
