'use strict';

(function () {

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var fieldsets = document.querySelectorAll('fieldset');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var descriptionInput = adForm.querySelector('#description');
  var featuresCheckboxes = adForm.querySelectorAll('.feature__checkbox');
  var resetFormButton = adForm.querySelector('.ad-form__reset');

  var setAddress = function (data) {
    addressInput.value = data;
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    setDisabledFieldsets(fieldsets, false);
    capacitySelect.value = '1';
    updateCapacity();
  };

  var deactivate = function () {
    setDisabledFieldsets(fieldsets, true);
    adForm.classList.add('ad-form--disabled');
    updateCapacity();
    clearForm();
  };

  var clearForm = function () {
    titleInput.value = null;
    descriptionInput.value = null;
    priceInput.value = null;
    capacitySelect.value = '1';
    typeSelect.value = 'flat';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    roomNumberSelect.value = '1';
    capacitySelect.value = '1';
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      featuresCheckboxes[i].removeAttribute('checked');
    }
  };

  var setDisabledFieldsets = function (data, bool) {
    for (var i = 0; i < data.length; i++) {
      data[i].disabled = bool;
    }
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

  var typeSelectHandler = function () {
    switch (typeSelect.value) {
      case 'bungalo': priceInput.setAttribute('min', '0'); break;
      case 'flat': priceInput.setAttribute('min', '1000'); break;
      case 'house': priceInput.setAttribute('min', '5000'); break;
      case 'palace': priceInput.setAttribute('min', '10000'); break;
    }
  };

  var timeInChangeHandler = function () {
    timeOut.value = timeIn.value;
  };

  var timeOutChangeHandler = function () {
    timeIn.value = timeOut.value;
  };

  var onError = function (message) {
    window.error.show(message);
    document.addEventListener('keydown', window.error.escPress);
    document.addEventListener('click', window.error.onPageClickPress);
  };

  var onLoad = function () {
    window.success.show();
    document.addEventListener('keydown', window.success.escPress);
    document.addEventListener('click', window.success.onPageClickPress);
    window.map.deactivatePage();
    window.pin.deletePins();
  };

  roomNumberSelect.addEventListener('focus', function () {
    setDisabledOptions(capacitySelect.querySelectorAll('option'));
  });

  roomNumberSelect.addEventListener('change', updateCapacity);

  typeSelect.addEventListener('change', typeSelectHandler);

  timeIn.addEventListener('change', timeInChangeHandler);

  timeOut.addEventListener('change', timeOutChangeHandler);

  adForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(adForm), onLoad, onError);
    evt.preventDefault();
  });

  resetFormButton.addEventListener('click', clearForm());

  window.form = {
    activate: activate,
    deactivate: deactivate,
    setAddress: setAddress
  };

})();
