(function () {
  'use strict';
  angular
  .module('app')
  .component('groupedbarchart', {
    templateUrl: 'app/components/groupedbarchart/groupedbarchart.html',
    controller: groupedbarchartController
  });

  function groupedbarchartController(Firebaseio, ContainerSrv, $scope, $rootScope) {
    this.service = ContainerSrv;
    var elm = angular.element(document.querySelector(".flowmap"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;

    var margin = {top: 165, right: 10, bottom: 25, left: 60},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var x1 = d3.scale.ordinal();
    var y = d3.scale.linear().range([height, 0]);
    var color = d3.scale.ordinal().range(["#DE1C5C", "rgb(151, 181, 181)"]);

    var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) {
      if (d % 500 === 0) {
        return d + "k";
      }
    });

    var svg = d3.select(".gbarchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select(".gbarchart").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    $scope.$watch('$ctrl.service.sharedYear', function (YEAR) {
      svg.selectAll(".region").remove();
      svg.selectAll(".tick").remove();

      Firebaseio.getBarchartData(YEAR, function (error, data) {
        // console.log(data);
        var regionNames = d3.keys(data[0]).filter(function(key) { return key !== "region"; });

        data.forEach(function(d) {
          d.regions = regionNames.map(function(name) {
            return {name: name, value: +d[name], reg: d.region};
          });
        });

        x0.domain(data.map(function(d) { return d.region; }));
        x1.domain(regionNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(d.regions, function(d) { return d.value; }); })]);

        svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".4em")
        .style("text-anchor", "end")
        .style("font-size", 10)
        .text("people");

        svg.selectAll("g")
          .style("fill", "rgb(151, 181, 181)");

        svg.selectAll(".tick")
          .style("font-size", 12);

        svg.selectAll("path").attr("stroke-width", 20)

        var region = svg.selectAll(".region")
          .data(data)
          .enter().append("g")
          .attr("class", "region")
          .attr("transform", function(d) {
            return "translate(" + x0(d.region) + ",0)";
          });

        region.selectAll("rect")
          .data(function(d) { return d.regions; })
          .enter().append("rect")
          .attr("width", 0)
          .attr("x", function(d) { return x1(d.name) + 10; })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) {
            return height - y(d.value);
          })
          .style("fill", function(d) {
            return color(d.name);
          })
          .style("opacity", 0.6);

        region.selectAll("rect")
          .transition()
          .duration(2000)
          .attr("width", x1.rangeBand() - 1);

        region.selectAll("rect")
          .on("mouseover", function(d){
            var msg = "In total of " + d.value + ",000 people ";
            if (d.name === "loss") {
              msg += "left from this region"
            } else {
              msg += "moved into this region"
            }
            tooltip.transition().duration(500).style("opacity", 0.9);
            tooltip.html(msg)
            .style("top", (event.pageY-10) - 750 + "px")
            .style("left", (event.pageX+10) - 400 + "px");
          })
          .on("mouseout", function (d) {
            tooltip.transition().duration(500).style("opacity", 0);
          });

        $rootScope.$on('region', function(event, region) {
            svg.selectAll("rect")
              .transition()
              .duration(1000)
              .style("fill", function(d) {
                if (d.name === "gain" && d.reg === region) {
                  return "#23CF5F";
                }
                return color(d.name);
              });
        });

        $rootScope.$on('demographic:changed', function(event, bool) {
          svg.selectAll("rect")
            .transition()
            .duration(1000)
            .style("fill", function(d) {
              return color(d.name);
            });
        });
      });
    });
  }
})();
