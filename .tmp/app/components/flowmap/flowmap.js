(function () {
  'use strict';
  angular
  .module('app')
  .component('flowmap', {
    bindings: {
      year: '<'
    },
    templateUrl: 'app/components/flowmap/flowmap.html',
    controller: flowmapController
  });

  function flowmapController(D3srv, Firebaseio, ContainerSrv) {
    var d3flowmap = D3srv.flowmap;
    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".flowmap"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;
    var color = d3flowmap.getScaleLinearColors().domain([0, 1, 2, 3]);
    var projection = d3flowmap.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
    var path = d3flowmap.getPath().projection(projection);
    var svg = d3flowmap.getSVG('.flowmap', w, h);
    var YEAR = ContainerSrv.sharedYear;
    this.year = ContainerSrv.sharedYear;
    // console.log(ContainerSrv.sharedYear);
    // Define the div for the tooltip
    var div = d3flowmap.getTooltip();

    d3flowmap.addLegend('.flowmap', color, w, h);
    // Load GeoJSON data and merge with states data
    io.getUsaStates(function (error, features) {
      if (error) {
        throw error;
      }
      d3flowmap.displayGeoPath(svg, features, path, color);
    });

    // get the total number of array to display bubbles on teh screen
    io.getTotalGains(YEAR, function (error, data) {
      if (error) {
        throw error;
      }
      // draws the bubbles
      var bubbles = d3flowmap.displayBubbles(svg, data, projection, w);
      bubbles.transition()
        .duration(500)
        .attr("r", function (d) {
          return Math.sqrt(d.total) * w / 600;
        });
      var selected = null;
      // mouse interaction
      bubbles.on("mousedown", function (d) {
        // drawing the lines point to point
        d3flowmap.removeLines(svg);
        d3flowmap.tooltip.hide(div);
        d3flowmap.drawLines(svg, data, projection, d.index);
        // when bubble selected
        bubbles.transition()
          .duration(1000)
          .attr("r", function (data) {
            if (data.region === d.region) {
              return Math.sqrt(data.total) * w / 600;
            }
            return Math.sqrt(data[d.region]) * w / 600;
          })
          .style("fill", function (data) {
            if (data.region === d.region) {
              return "#23CF5F";
            }
            return "#DE1C5C";
          })
          .style("opacity", 0.8);
        selected = d;
        // console.log(data[0]);
      })
      .on('mouseover', function (d) {
        d3flowmap.tooltip.show(div);
        if (selected !== null && d.region !== selected.region) {
          div.html(d.region + ' lost ' + selected[d.region]);
        } else {
          div.html(d.region + ' gain ' + d.total);
        }
        div.style("left", (d3.mouse(this)[0]) + "px")
          .style("top", (d3.mouse(this)[1]) + "px");
      })
      .on("mouseout", function (d) {
        d3flowmap.tooltip.hide(div);
      });
    });
  }
})();
