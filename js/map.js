'use strict';
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

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var pinsMap = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var pins = [];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomItem = function (items) {
  return getRandomInt(0, items.length - 1);
};

var randomCompare = function () {
  return Math.random() - 0.5;
};

var getItem = function (number) {
  var x = getRandomInt(0, pinsMap.offsetWidth);
  var y = getRandomInt(130, 630);
  var item = {
    autor: {
      avatar: 'img/avatars/user0' + (number + 1) + '.png'
    },
    offer: {
      title: TITLES[number],
      address: x + ', ' + y,
      price: getRandomInt(1000, 1000000),
      type: getRandomItem(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomItem(TIMES),
      checkout: getRandomItem(TIMES),
      features: FEATURES.slice(getRandomInt(0, FEATURES.length - 1)),
      description: '',
      photos: PHOTOS.slice().sort(randomCompare)
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

var renderMapPin = function (item) {
  var mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style = 'left: ' + (item.location.x + PIN_WIDTH / 2) + 'px; top: ' + (item.location.y + PIN_HEIGHT) + 'px;';
  mapPin.querySelector('img').src = item.autor.avatar;
  mapPin.querySelector('img').alt = item.offer.title;

  return mapPin;
};

var appendPins = function (items) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderMapPin(items[i]));
  }
  pinsMap.appendChild(fragment);
};

var getFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  features.forEach(function (item) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + item);
    fragment.appendChild(li);
  });
  return fragment;
};

var getPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  pictures.forEach(function (item) {
    var img = document.createElement('img');
    img.src = item;
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    img.classList.add('popup__photo');
    fragment.appendChild(img);
  });
  return fragment;
};

var renderAd = function (item) {
  var adItem = mapAdTemplate.cloneNode(true);

  adItem.querySelector('.popup__title').textContent = item.offer.title;
  adItem.querySelector('.popup__text--address').textContent = item.offer.address;
  adItem.querySelector('.popup__text--price').innerHTML = item.offer.price + '&#x20bd;<span>/ночь</span></p>';

  var offerType;
  switch (item.offer.type) {
    case 'flat': offerType = 'Квартира'; break;
    case 'bungalo': offerType = 'Бунгало'; break;
    case 'house': offerType = 'Дом'; break;
    case 'palace': offerType = 'Дворец'; break;
  }
  adItem.querySelector('.popup__type').textContent = offerType;
  adItem.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  adItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', ' + 'выезд до ' + item.offer.checkout;
  adItem.querySelector('.popup__description').textContent = item.offer.description;
  adItem.querySelector('.popup__avatar').src = item.autor.avatar;

  var pictures = adItem.querySelector('.popup__photos');
  var newPictures = pictures.cloneNode();
  newPictures.appendChild(getPictures(item.offer.photos));
  adItem.replaceChild(newPictures, pictures);

  var features = adItem.querySelector('.popup__features');
  var newFeatures = features.cloneNode();
  newFeatures.appendChild(getFeatures(item.offer.features));
  adItem.replaceChild(newFeatures, features);

  return adItem;
};

var appendAd = function (item) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderAd(item));
  map.insertBefore(fragment, mapFilters);
};

pins = getItemsList(8);
appendPins(pins);
appendAd(pins[0]);

map.classList.remove('map--faded');
