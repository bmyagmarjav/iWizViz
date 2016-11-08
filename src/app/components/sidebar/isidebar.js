/*
* Testing firebase
*/
(function () {
  'use strict';

  // component sample
  angular
  .module('app')
  .component('isidebar', {
    templateUrl: 'app/components/sidebar/isidebar.html',
    bindings: {
      username: '<'
    },
    controller: isidebarController
  });

  // contoller for sampel componenet
  function isidebarController() {

  }
})();
