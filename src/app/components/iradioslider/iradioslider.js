(function () {
  'use strict';
  angular
  .module('app')
  .component('iradioslider', {
    templateUrl: 'app/components/iradioslider/iradioslider.html',
    controller: iradiosliderController
  });

  function iradiosliderController($scope, ContainerSrv, $log) {
    $scope.years = generateYears(2000, 2016);
    $scope.selected = {year: '2001'};
    $scope.$watch('selected.year', function (value) {
      ContainerSrv.sharedYaar = value;
      // $log.info(ContainerSrv.sharedYaar);
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
