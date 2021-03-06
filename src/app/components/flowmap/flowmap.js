(function () {
  'use strict';
  angular
  .module('app')
  .component('flowmap', {
    templateUrl: 'app/components/flowmap/flowmap.html',
    controller: flowmapController
  });

  function flowmapController(D3srv, Firebaseio, ContainerSrv, $scope, $rootScope) {
    var d3flowmap = D3srv.flowmap;
    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".flowmap"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;
    var color = d3flowmap.getScaleLinearColors().domain([0, 1, 2, 3]);
    var projection = d3flowmap.getAlberUsa().translate([w / 2, h / 2]).scale([w]);
    var path = d3flowmap.getPath().projection(projection);
    var svg = d3flowmap.getSVG('.flowmap', w, h);

    this.service = ContainerSrv;
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
    $scope.$watch('$ctrl.service.sharedYear', function (YEAR) {
      // remove lines and goes back first state and change color
      d3flowmap.removeLines(svg);
      svg.selectAll("circle").style("fill", "rgb(151, 181, 181)");

      io.getTotalGains(YEAR, function (error, data) {
        if (error) {
          throw error;
        }

        // draws the bubbles
        var bubbles = d3flowmap.displayBubbles(svg, data, projection, w);
        // animate the circles - as last state
        svg.selectAll("circle").transition()
          .duration(2000)
          .attr("r", function (d) {
            return Math.sqrt(d.total) * w / 600;
          });

        var selected = null;
        // mouse interaction
        bubbles
        .on("mousedown", function (d) {
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

          $rootScope.$broadcast('region', d.region);
        })
        .on('mouseover', function (d) {
          d3flowmap.tooltip.show(div);
          if (selected !== null && d.region !== selected.region) {
            div.html(d.region + ' decreased by </br> ' + selected[d.region] + ",000 people");
          } else {
            div.html(d.region + ' increased by </br> ' + d.total + ",000 people");
          }
          div.style("left", (d3.mouse(this)[0]) - 200 + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
            .style("opacity", 0.4);
        })
        .on("mouseout", function (d) {
          d3flowmap.tooltip.hide(div);
        });

        // linked
        $rootScope.$on('demographic:changed', function(event, bool) {
          d3flowmap.removeLines(svg);
          svg.selectAll("circle").style("fill", "rgb(151, 181, 181)");
          svg.selectAll("circle").transition()
            .duration(2000)
            .attr("r", function (d) {
              return Math.sqrt(d.total) * w / 600;
            });
        });
      });
    });
  }
})();
