(function () {
  'use strict';
  angular
  .module('app')
  .component('iradioslider', {
    templateUrl: 'app/components/iradioslider/iradioslider.html',
    controller: iradiosliderController,
    scope: {
      selected: '='
    }
  });

  function iradiosliderController($scope, ContainerSrv, $log, $rootScope) {
    $scope.years = generateYears(2000, 2016);
    $scope.selected = {year: '2001'};
    ContainerSrv.sharedYear = $scope.selected.year;

    $scope.$watch('selected.year', function (value) {
      ContainerSrv.sharedYear = value;
      $log.info(ContainerSrv.sharedYear);
    });
  }

  function generateYears(start, end) {
    var years = [];
    for (var year = start; year < end; year++) {
      years.push(year);
    }
    return years;
  }
})();
