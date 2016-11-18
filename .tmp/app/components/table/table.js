(function () {
  'use strict';
  angular
  .module('app')
  .component('table', {
    templateUrl: 'app/components/table/table.html',
    controller: tableController
  });

  function tableController(Firebaseio, $scope, ContainerSrv, $state) {
    this.service = ContainerSrv;
    Firebaseio.getMigration(this.service.sharedYear, function(error, data) {
      if (error) {
        throw error;
      }
      var table = [];
      Object.keys(data['From West']['South'].Type1).forEach(function(key) {
        // console.log(key);
        if (key !== 'Total') {
          table = update(table, data, 'From Northeast', ' Midwest', key);
        }
      });
      $scope.types = table;
    });
  }

  function update(table, data,from, to, which) {
    var type = data[from][to].Type1[which];
    table.push([which]); //header
    Object.keys(type).forEach(function(a) {
      var people = [];
      people.push(a);
      Object.keys(data).forEach(function (from) {
        // console.log(from);
        Object.keys(data[from]).forEach(function (to) {
            // console.log(to);
            people.push(data[from][to].Type1[which][a]);
        });
      });
      table.push(people);
    });
    return table;
  }
})();
