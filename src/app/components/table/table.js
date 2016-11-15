(function () {
  'use strict';
  angular
  .module('app')
  .component('table', {
    templateUrl: 'app/components/table/table.html',
    controller: tableController
  });

  function tableController(Firebaseio, $scope) {
    Firebaseio.getMigration('2015', function(error, data) {
      var age = data['From Midwest']['Northeast'].Type1.Age;
      var ages = [];
      Object.keys(age).forEach(function(a) {
        ages.push({a: a});
      });
      $scope.types = ages;

      $scope.$watch('type', function (value) {
        console.log(value);
      });

      var people = [];
      Object.keys(data).forEach(function (from) {
        // console.log(data[from]);
        Object.keys(data[from]).forEach(function (to) {
            // console.log(data[from][to].Type1.Age);
            people.push(data[from][to].Type1.Age);
        });
      });
      $scope.arr = people;
      // console.log(people);
    });
  }
})();
