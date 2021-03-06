'use strict';

(function () {

  var ANY = 'any';

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFieldsets = filtersForm.querySelectorAll('fieldset');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  var formData = {features: []};
  var filteredAds;

  var activate = function () {
    window.utils.setDisabled(filtersFormFieldsets, false);
    window.utils.setDisabled(filtersFormSelects, false);
  };

  var deactivate = function () {
    window.utils.setDisabled(filtersFormFieldsets, true);
    window.utils.setDisabled(filtersFormSelects, true);
  };

  var getMapFilterData = function () {
    var data = {features: []};
    filtersForm.querySelectorAll('select').forEach(function (item) {
      data[item.name] = item.value;
    });
    filtersForm.querySelectorAll('input:checked').forEach(function (item) {
      data.features.push(item.value);
    });
    formData = data;
  };

  var isMatchHousingType = function (formValue, type) {
    return formValue === ANY || formValue === type;
  };

  var isMatchHousingRooms = function (formValue, rooms) {
    return formValue === ANY || formValue === String(rooms);
  };

  var isMatchHousingGuests = function (formValue, guests) {
    return formValue === ANY || formValue >= String(guests);
  };

  var isMatchHoustingPrice = function (formValue, price) {
    var match = true;
    switch (formValue) {
      case 'low': match = price < 10000; break;
      case 'middle': match = price >= 10000 && price < 50000; break;
      case 'high': match = price >= 50000; break;
    }
    return match;
  };

  var isMatchFeatures = function (formValue, features) {
    var match = false;
    var i = 0;
    formValue.forEach(function (formItem) {
      features.forEach(function (dataItem) {
        if (formItem === dataItem) {
          i++;
        }
      });
    });
    if (formValue.length === i) {
      match = true;
    } else {
      match = false;
    }
    return match;
  };

  var getFilteredAds = function () {
    filteredAds = window.pin.getPinsData().slice(0).filter(function (item) {
      return isMatchHousingType(formData['housing-type'], item.offer.type) &&
        isMatchHoustingPrice(formData['housing-price'], item.offer.price) &&
        isMatchHousingRooms(formData['housing-rooms'], item.offer.rooms) &&
        isMatchHousingGuests(formData['housing-guests'], item.offer.guests) &&
        isMatchFeatures(formData.features, item.offer.features);
    }).slice(0);
  };

  var getFiltratedPins = function () {
    window.adCard.closeAd();
    getMapFilterData();
    getFilteredAds();
    window.pin.deletePins();
    window.pin.appendPins(filteredAds);
  };

  var onFilterItemChange = window.utils.debounce(getFiltratedPins, 500);

  filtersForm.addEventListener('change', onFilterItemChange);

  window.filter = {
    activate: activate,
    deactivate: deactivate
  };

})();
