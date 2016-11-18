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
    $scope.years = generateYears(2000, 2016);
    this.year = 2015;

    $scope.$watch('$ctrl.year', function (value) {
      ContainerSrv.sharedYear = value;
    });

    // $scope.reload = function () {
    //   $state.reload();
    // };

    // $scope.mystyle = {'background-color':'blue'};
  }

  function generateYears(start, end) {
    var years = [];
    for (var year = start; year < end; year++) {
      years.push(year);
    }
    return years;
  }
})();
