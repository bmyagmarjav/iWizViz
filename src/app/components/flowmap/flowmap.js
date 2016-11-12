(function (angular) {
  'use strict';
  angular
  .module('app')
  .config(function($stateProvider) {
    $stateProvider.state({name: 'flowmap',
      url: '/flowmap',
      templateUrl: 'app/components/flowmap/flowmap.html',
      controller: flowmapController
    })
  });

  function flowmapController(D3srv, Firebaseio, ContainerSrv, $window, $scope, $rootScope) {
    var d3 = D3srv;
    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".flowmap"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;
    var color = d3.getScaleLinearColors().domain([0, 1, 2, 3]);

    $('#radios').radiosToSlider();

    var projection = d3.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
    var path = d3.getPath().projection(projection);
    var svg = d3.getSVG('.flowmap', w, h);

    d3.selectWindow().on("resize", function () {
      w = elm.clientWidth;
      h = elm.clientHeight;
      projection = d3.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
      path = d3.getPath().projection(projection);
      svg = d3.getSVG('.flowmap', w, h);
    });


    // Load GeoJSON data and merge with states data
    io.getUsaStates(function (error, features) {
      if (error) {
        throw error;
      }
      // Bind the data to the SVG and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", 1)
        .style("fill", function (d) {
          var value = d.properties.region;
          return color(value);
        });
    });

    // get the total number of array to display bubbles on teh screen
    io.getTotalGains('2001', function (error, data) {
      if (error) {
        throw error;
      }
      // console.log(data);

      // draws the bubbles
      d3.displayBubbles(svg, data, projection);

      // drawing the lines point to point
      var x2 = projection([data[0].coordinate.long, data[0].coordinate.lat])[0];
      var y2 = projection([data[0].coordinate.long, data[0].coordinate.lat])[1];
      for (var i = 1; i < 4; i++) {
        var x1 = projection([data[i].coordinate.long, data[i].coordinate.lat])[0];
        var y1 = projection([data[i].coordinate.long, data[i].coordinate.lat])[1];

        svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x1)
        .attr("y2", y1)
        .attr("stroke-width", 3)
        .attr("stroke", "rgb(251, 144, 51)")
          .transition()
          .duration(1000)
          .ease("linear")
          .attr("x2", x2)
          .attr("y2", y2);
      }
    });
  }
})(window.angular);
