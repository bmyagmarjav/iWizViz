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
    var w = $window.innerWidth;
    var h = 500;

    var projection = d3.getAlberUsa().translate([w / 2, h / 2]).scale([1000]);
    var path = d3.getPath().projection(projection);
    var color = d3.getScaleLinearColors();
    var svg = d3.getSVG('.flowmap', w, h);

    // Load in my states data!
    d3.readCSV("../../../data/regions.csv", function (data) {
      color.domain([0, 1, 2, 3]); // setting the range of the input data

      // Load GeoJSON data and merge with states data
      d3.readJSON("../../../data/us-states.json", function (json) {
        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {
          // Grab State Name
          var dataState = data[i].state;
          // Grab data value
          var dataValue = data[i].region;
          // Find the corresponding state inside the GeoJSON
          for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;
            if (dataState === jsonState) {
              // Copy the data value into the JSON
              json.features[j].properties.region = dataValue;
              // Stop looking through the JSON
              break;
            }
          }
        }

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .style("fill", function (d) {
            var value = d.properties.region;
            return color(value);
          });
      });
    });

    // get the total number of array to display bubbles on teh screen
    io.getTotalGains('2000', function (error, data) {
      if (error) {
        throw error;
      }
      // console.log(data);

      // draws the bubbles
      d3.displayBubbles(svg, data, projection);

      // drawing the lines point to point
      var x1 = projection([data[0].coordinate.long, data[0].coordinate.lat])[0];
      var y1 = projection([data[0].coordinate.long, data[0].coordinate.lat])[1];
      for (var i = 1; i < 4; i++) {
        var x2 = projection([data[i].coordinate.long, data[i].coordinate.lat])[0];
        var y2 = projection([data[i].coordinate.long, data[i].coordinate.lat])[1];

        svg.append("line")
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke-width", 3)
          .attr("stroke", "orange");
      }
    });
  }
})();
