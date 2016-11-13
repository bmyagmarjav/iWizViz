(function(angular) {
  'use strict';
  angular
  .module('app')
  .component('isidebar', {
    templateUrl: 'app/components/sidebar/isidebar.html',
    controller: isidebarController,
  });

  // contoller for sampel componenet
  function isidebarController($scope, $state) {
    $('li a').click(function (e) {
      e.preventDefault();
      $('a').removeClass('active');
      $(this).addClass('active');
    });
  }
})(window.angular);
