(function () {
  'use strict';

  angular.module('app', []);

  var config = {
    apiKey: "AIzaSyC188Gz-CiFIHxtHTRWq6P6EGgoRXWhs9s",
    authDomain: "iwizviz.firebaseapp.com",
    databaseURL: "https://iwizviz.firebaseio.com",
    storageBucket: "iwizviz.appspot.com"
  };

  firebase.initializeApp(config);
})();
