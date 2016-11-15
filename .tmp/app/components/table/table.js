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
      var ed = data['From Midwest']['Northeast'].Type1['Educational Attainment'];
      var ages = [];
      Object.keys(age).forEach(function(a) {
        var people = [];
        people.push(a);

        Object.keys(data).forEach(function (from) {
          // console.log(from);
          Object.keys(data[from]).forEach(function (to) {
              // console.log(to);
              people.push(data[from][to].Type1.Age[a]);
          });
        });
        ages.push(people);
      });

      ages.push("");

      Object.keys(ed).forEach(function(a) {
        var people = [];
        people.push(a);

        Object.keys(data).forEach(function (from) {
          // console.log(from);
          Object.keys(data[from]).forEach(function (to) {
              // console.log(to);
              people.push(data[from][to].Type1['Educational Attainment'][a]);
          });
        });
        ages.push(people);
      });
      $scope.types = ages;
    });
  }
})();
