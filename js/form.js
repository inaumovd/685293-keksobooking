'use strict';

(function () {

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var resetFormButton = adForm.querySelector('.ad-form__reset');


  var setAddress = function (data) {
    addressInput.value = data;
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    window.utils.setDisabled(adFormFieldsets, false);
    capacitySelect.value = '1';
    updateCapacity();
  };

  var deactivate = function () {
    window.utils.setDisabled(adFormFieldsets, true);
    adForm.classList.add('ad-form--disabled');
    updateCapacity();
    adForm.reset();
  };

  var setDisabledOptions = function (node) {
    for (var i = 0; i < node.length; i++) {
      node[i].removeAttribute('disabled');
    }
  };

  var updateCapacity = function () {
    var roomNumber = roomNumberSelect.value;
    var capacity = capacitySelect.value;
    var currentCapacityOption = capacitySelect.querySelector('option[value="' + capacity + '"]');
    var errorMessage;
    var items = capacitySelect.querySelectorAll('option');
    for (var i = 0; i < items.length; i++) {
      if (roomNumber === '100') {
        items[i].disabled = (items[i].value !== '0');
      } else {
        items[i].disabled = (items[i].value === '0' || items[i].value > roomNumber);
      }
    }
    errorMessage = currentCapacityOption.disabled ? 'Некорректный выбор' : '';
    capacitySelect.setCustomValidity(errorMessage);
  };

  var onTypeSelectChange = function () {
    switch (typeSelect.value) {
      case 'bungalo': priceInput.setAttribute('min', '0'); priceInput.placeholder = '0'; break;
      case 'flat': priceInput.setAttribute('min', '1000'); priceInput.placeholder = '1000'; break;
      case 'house': priceInput.setAttribute('min', '5000'); priceInput.placeholder = '5000'; break;
      case 'palace': priceInput.setAttribute('min', '10000'); priceInput.placeholder = '10000'; break;
    }
  };

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var onError = function (message) {
    window.error.show(message);
  };

  var onLoad = function () {
    window.success.show();
    window.map.deactivatePage();
  };

  roomNumberSelect.addEventListener('focus', function () {
    setDisabledOptions(capacitySelect.querySelectorAll('option'));
  });

  roomNumberSelect.addEventListener('change', function () {
    updateCapacity();
  });

  typeSelect.addEventListener('change', onTypeSelectChange);

  timeIn.addEventListener('change', onTimeInChange);

  timeOut.addEventListener('change', onTimeOutChange);

  adForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(adForm), onLoad, onError);
    evt.preventDefault();
  });

  resetFormButton.addEventListener('click', function () {
    window.adCard.closeAd();
    window.map.deactivatePage();
  });

  window.form = {
    activate: activate,
    deactivate: deactivate,
    setAddress: setAddress
  };

})();
