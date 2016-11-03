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
  function isidebarController($log, $window, $firebaseObject, Firebaseio, D3srv) {
    var self = this;
    // download the data into a local object
    var obj = $firebaseObject(Firebaseio.getMigrationRef());
    // syncObject.$bindTo(self, 'username');
    // self.username = obj;
    obj.$loaded()
    .then(function (data) {
      self.username = data['2000']['From Midwest'].Northeast;
    })
    .catch(function (error) {
      $log.info("Error:", error);
    });
    $log.info(obj);

    var sampleSVG = D3srv.select("#viz")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100);

    sampleSVG.append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 50)
    .on("mouseover", function () {
      d3.select(this).style("fill", "aliceblue");
    })
    .on("mouseout", function () {
      d3.select(this).style("fill", "white");
    });

    $log.info($window.innerWidth);

    angular.element($window).bind('resize', function () {
      $log.info($window.innerWidth);
      $log.info($window.innerHeight);
    });
  }
})();
