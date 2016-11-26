(function () {
  'use strict';
  angular
  .module('app')
  .component('istarplot', {
    templateUrl: 'app/components/istarplot/istarplot.html',
    controller: istarplotController
  });

  function istarplotController(Firebaseio) {
    Firebaseio.getReasons('2001', function (error, reasons) {
      var data = [];
      var inner = [];
      Object.keys(reasons).forEach(function (reason) {
        inner.push({
          axis: reason,
          value: +reasons[reason].Total.replace(",", "")
        });
      });
      data.push(inner);

      var elm = angular.element(document.querySelector(".istarplot"))[0];
      var w = elm.clientWidth;
      var h = elm.clientHeight;
      var customColor = d3.scale.linear().domain([1,length])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb(251, 144, 51), d3.rgb("#70DCDC")]);

      var config = {
        w: w,
        h: w,
        levels: 1,
        factor: 0.8,
        factorLegend: 10,
        radians: 2 * Math.PI,
        color: customColor
      }

      d3.selectAll('.area.radar-chart-serie0').style("fill", "yellow");

      RadarChart.draw(".istarplot", data, config);
    });
  }
})();
