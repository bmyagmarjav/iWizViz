(function () {
  'use strict';
  // firebase service
  angular.module('app', ['firebase']).service('Firebaseio', Firebaseio);
  // d3js service
  angular.module('app').service('D3srv', D3srv);
})();
