'use strict';

(function () {
  var CARD_PICTURES_WIDTH = 45;
  var CARD_PICTURES_HEIGHT = 40;
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
      img.width = CARD_PICTURES_WIDTH;
      img.height = CARD_PICTURES_HEIGHT;
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

    closeBtn.addEventListener('click', function () {
      closeAd();
    });
    document.addEventListener('keydown', onPopupEscPress);

    if (item.offer.title) {
      adItem.querySelector('.popup__title').textContent = item.offer.title;
    } else {
      adItem.querySelector('.popup__title').setAttribute('hidden', 'hidden');
    }

    if (item.offer.address) {
      adItem.querySelector('.popup__text--address').textContent = item.offer.address;
    } else {
      adItem.querySelector('.popup__text--address').setAttribute('hidden', 'hidden');
    }

    if (item.offer.price) {
      adItem.querySelector('.popup__text--price').innerHTML = item.offer.price + '&#x20bd;<span>/ночь</span></p>';
    } else {
      adItem.querySelector('.popup__text--price').setAttribute('hidden', 'hidden');
    }

    var offerType;
    switch (item.offer.type) {
      case 'flat': offerType = 'Квартира'; break;
      case 'bungalo': offerType = 'Бунгало'; break;
      case 'house': offerType = 'Дом'; break;
      case 'palace': offerType = 'Дворец'; break;
    }

    if (offerType) {
      adItem.querySelector('.popup__type').textContent = offerType;
    } else {
      adItem.querySelector('.popup__type').setAttribute('hidden', 'hidden');
    }

    if (item.offer.rooms) {
      adItem.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    } else {
      adItem.querySelector('.popup__text--capacity').setAttribute('hidden', 'hidden');
    }

    if (item.offer.checkin && item.offer.checkout) {
      adItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', ' + 'выезд до ' + item.offer.checkout;
    } else {
      adItem.querySelector('.popup__text--capacity').setAttribute('hidden', 'hidden');
    }

    if (item.offer.description) {
      adItem.querySelector('.popup__description').textContent = item.offer.description;
    } else {
      adItem.querySelector('.popup__description').setAttribute('hidden', 'hidden');
    }

    if (item.offer.description) {
      adItem.querySelector('.popup__avatar').src = item.author.avatar;
    } else {
      adItem.querySelector('.popup__avatar').setAttribute('hidden', 'hidden');
    }

    if (item.offer.photos) {
      var pictures = adItem.querySelector('.popup__photos');
      var newPictures = pictures.cloneNode();
      newPictures.appendChild(getPictures(item.offer.photos));
      adItem.replaceChild(newPictures, pictures);
    } else {
      adItem.querySelector('.popup__photos').setAttribute('hidden', 'hidden');
    }

    if (item.offer.features) {
      var features = adItem.querySelector('.popup__features');
      var newFeatures = features.cloneNode();
      newFeatures.appendChild(getFeatures(item.offer.features));
      adItem.replaceChild(newFeatures, features);
    } else {
      adItem.querySelector('.popup__features').setAttribute('hidden', 'hidden');
    }

    return adItem;
  };

  var appendAdCard = function (item) {
    if (currentAd) {
      currentAd.parentElement.removeChild(currentAd);
    }
    currentAd = map.insertBefore(getMapCard(item), mapFilters);
  };

  var closeAd = function () {
    if (currentAd) {
      map.removeChild(document.querySelector('article.map__card'));
      document.removeEventListener('keydown', onPopupEscPress);
      currentAd = null;
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeAd();
    }
  };

  window.adCard = {
    appendAdCard: appendAdCard,
    closeAd: closeAd
  };

})();
