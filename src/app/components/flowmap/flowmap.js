(function () {
  'use strict';
  angular
  .module('app')
  .component('flowmap', {
    templateUrl: 'app/components/flowmap/flowmap.html',
    controller: flowmapController
  });

  function flowmapController(D3srv, Firebaseio, $window) {
    var d3 = D3srv;
    var io = Firebaseio;
    var col = 5;
    var w = $window.innerWidth * col / 12;
    var h = $window.innerHeight / 2.5;

    $('#radios').radiosToSlider();

    var projection = d3.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
    var path = d3.getPath().projection(projection);
    var color = d3.getScaleLinearColors();
    var svg = d3.getSVG('.flowmap', w, h);

    d3.selectWindow().on("resize", function () {
      w = $window.innerWidth * col / 12;
      h = $window.innerHeight / 2.5;
      projection = d3.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
      path = d3.getPath().projection(projection);
      svg = d3.getSVG('.flowmap', w, h);
    });

    color.domain([0, 1, 2, 3]); // setting the range of the input data

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
            .duration(2000)
            .ease("linear")
            .attr("x2", x2)
            .attr("y2", y2);
      }
    });
  }
})();
