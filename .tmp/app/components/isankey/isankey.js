(function () {
  'use strict';
  angular
  .module('app')
  .component('isankey', {
    templateUrl: 'app/components/isankey/isankey.html',
    controller: isankeyController
  });

  var colors = {
    "From West": "#70DCDC",
    "From Midwest": "#59A0D5",
    "From South": "#D0B3DF",
    "From Northeast": "#FAB9C6",
    "West": "#70DCDC",
    " Midwest": "#59A0D5",
    "South": "#D0B3DF",
    "Northeast": "#FAB9C6"
  };

  var options = {
    availableOptions: [
      {id: '1', name: 'Default', type: 'Type1'},
      {id: '2', name: 'Age', type: 'Type1'},
      {id: '3', name: 'Sex', type: 'Type1'},
      {id: '4', name: 'Tenure', type: 'Type1'},
      {id: '5', name: 'Income', type: 'Type2'},
      {id: '6', name: 'Marital Status', type: 'Type1'},
      {id: '7', name: 'Labor force status', type: 'Type2'},
      {id: '8', name: 'Relationship to House', type: 'Type1'},
      {id: '9', name: 'Educational Attainment', type: 'Type1'}
    ],
    selectedOption: {id: '1', name: 'Default'}
  };

  function isankeyController(Firebaseio, ContainerSrv, $window, $scope, $rootScope) {
    $scope.data = options;

    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".sankey-diagram"))[0];
    var w = elm.clientWidth - 35;
    var h = elm.clientHeight - 100;

    var svg = d3.select(".sankey-diagram").append("svg")
      .attr("width", w + 35)
      .attr("height", h + 50)
      .append("g")
      .attr("transform", "translate(" + 20 + "," + 15 + ")");

    var graph = d3.sankey().nodeWidth(15).nodePadding(15).size([w, h]);
    var path = graph.link();

    var tooltip = d3.select(".sankey-diagram").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    this.service = ContainerSrv;

    $scope.$watchGroup(['$ctrl.service.sharedYear', 'data.selectedOption'], function (it) {
      var YEAR = it[0];
      // console.log(it[1]);
      svg.selectAll(".link").transition()
        .duration(2000)
        .style("stroke-width", function(d) {
          return 0;
        });

      // svg.selectAll("rect").transition()
      //     .duration(1000)
      //     .attr("width", 0);
      svg.selectAll("rect").remove();
      io.getNodesAndLinks(YEAR, it[1].name, it[1].type, function(error, nodes, links){
        if (error) {
          throw error;
        }
        graph.nodes(nodes).links(links).layout(32);

        // balance(nodes, graph);

        var link = svg.append("g").selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", "link")
          .attr("d", path)
          .style("stroke", function (d) {
            if (colors[d.source.name] === undefined) {
              return "rgb(251, 144, 51)";
            }
            return colors[d.source.name];
          })
          .style("stroke-width", function(d) {
            return 0;
          });

        link.transition()
          .duration(2000)
          .style("stroke-width", function(d) {
            return Math.max(1, d.dy);
          });

        var node = svg.append("g").selectAll(".node")
          .data(nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        var rect = node.append("rect")
          .attr("height", function(d) { return d.dy; })
          .attr("width", 0)
          .style("fill", function(d){
            if (colors[d.name] === undefined) {
              return "rgb(251, 144, 51)";
            }
            return colors[d.name];
          });

        rect.transition()
          .duration(2000)
          .attr("width", graph.nodeWidth());

        link.on("mouseover", function(d){
            tooltip.transition().duration(500).style("opacity", 0.9);
            tooltip.html(d["value"] + ",000 people migrated " + "<br/>"
              + d["source"].name.toLowerCase() + " to " + d["target"].name.toLowerCase())
              .style("top", (event.pageY-10) - 150 + "px")
              .style("left", (event.pageX+10) - 950 + "px")
          })
          .on("mouseout", function (d) {
            tooltip.transition().duration(500).style("opacity", 0);
          });

        // selected and will be highlighted
        $rootScope.$on('region', function(event, region) {
          link.transition()
            .duration(2000)
            .style("stroke", function(d) {
              if (d.source.name.substring(5).toLowerCase() === region.toLowerCase()) {
                return "#DE1C5C";
              }
              var mw = ""
              if (d.target.name.toLowerCase() === " midwest") {
                mw = "midwest";
              }
              if (it[1].name !== "Default" &&
                (d.target.name.toLowerCase() === region.toLowerCase() || mw === region.toLowerCase())) {
                return "#23CF5F";
              }
              return "rgb(151, 181, 181)";
            });
        });

        $scope.$watch('data.selectedOption', function (update) {
          $rootScope.$broadcast('demographic:changed', true);
        });
      });
    });
  }
})();
