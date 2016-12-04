(function () {
  'use strict';
  angular
  .module('app')
  .component('iradioslider', {
    bindings: {
      year: '<'
    },
    templateUrl: 'app/components/iradioslider/iradioslider.html',
    controller: iradiosliderController
  });

  function iradiosliderController($scope, ContainerSrv, $log, $state) {
    var y = 2000;
    if ($state.current.name === "reason") {
      y = 2001;
    }

    $scope.years = generateYears(y, 2016);
    this.year = y;

    $scope.$watch('$ctrl.year', function (value) {
      ContainerSrv.sharedYear = value;
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
