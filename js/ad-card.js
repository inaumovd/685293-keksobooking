'use strict';

(function () {

  var currentAd;
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapAdTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

  var getFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (item) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + item);
      fragment.appendChild(li);
    });
    return fragment;
  };

  var getMapCard = function (item) {
    var adItem = mapAdTemplate.cloneNode(true);
    var closeBtn = adItem.querySelector('.popup__close');

    closeBtn.addEventListener('click', closeAd);
    document.addEventListener('keydown', window.utils.onPopupEscPress);

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

  var appendAdCard = function (item) {
    if (currentAd) {
      currentAd.parentElement.removeChild(currentAd);
    }
    currentAd = map.insertBefore(getMapCard(item), mapFilters);
  };

  var closeAd = function () {
    map.removeChild(document.querySelector('article.map__card'));
    document.removeEventListener('keydown', window.utils.onPopupEscPress);
    currentAd = null;
  };

  window.adCard = {
    appendAdCard: appendAdCard,
    closeAd: closeAd
  };

})();
