/*
* Testing firebase
*/
(function () {
  'use strict';
  var ref = firebase.database().ref().child('Migration Flows Between Regions');

  angular
  .module('app', ['firebase'])
  .component('isidebar', {
    templateUrl: 'app/components/sidebar/isidebar.html',
    bindings: {
      username: '<'
    },
    controller: ['$scope', '$log', '$firebaseObject', isidebarController]
  });

  function isidebarController($scope, $log, $firebaseObject) {
    var self = this;
    // download the data into a local object
    var obj = $firebaseObject(ref);

    // syncObject.$bindTo(self, 'username');
    // self.username = obj;

    obj.$loaded()
    .then(function (data) {
      self.username = data['2000']['From Midwest'].Northeast;
    })
    .catch(function (error) {
      $log.info("Error:", error);
    });
    $log.info(obj);
  }
})();
