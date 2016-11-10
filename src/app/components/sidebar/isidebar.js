(function () {
  'use strict';
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
  function isidebarController($scope) {
    $('li a').click(function (e) {
      e.preventDefault();
      $('a').removeClass('active');
      $(this).addClass('active');
    });
  }
})();
