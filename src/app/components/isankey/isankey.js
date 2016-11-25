(function () {
  'use strict';
  angular
  .module('app')
  .component('isankey', {
    templateUrl: 'app/components/isankey/isankey.html',
    controller: isankeyController
  });

  var colors1 = {
    "From West": "#70DCDC",
    "From Midwest": "#59A0D5",
    "From South": "#D0B3DF",
    "From Northeast": "#FAB9C6"
  };

  var colors2 = {
    "West": "#70DCDC",
    "Midwest": "#59A0D5",
    "South": "#D0B3DF",
    "Northeast": "#FAB9C6"
  };

  function isankeyController(Firebaseio, $window) {
    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".sankey-diagram"))[0];
    var w = elm.clientWidth - 35;
    var h = elm.clientHeight - 70;

      var svg = d3.select(".sankey-diagram").append("svg")
        .attr("width", w + 35)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + 20 + "," + 15 + ")");

      var graph = d3.sankey().nodeWidth(15).nodePadding(15).size([w, h]);
      var path = graph.link();

     io.getNodesAndLinks('2015',function(error,nodes,links){
       if (error) {
          throw error;
        }

        console.log(nodes);
        console.log(links);

           var test=[{
          "source": 4,
          "target": 1,
           "value": links[0].value
        },
        {  "source":4,
            "target":2,
            "value": links[1].value

          },
          {  "source":4,
            "target":3,
            "value": links[2].value

          },
          {  "source":5,
            "target":0,
            "value": links[3].value

          },
          {  "source":5,
            "target":2,
            "value":links[4].value

          },
          {  "source":5,
            "target":3,
            "value": links[5].value

          },
          {  "source":6,
            "target":0,
            "value": links[6].value

          },
          {  "source":6,
            "target":1,
            "value": links[7].value

          },
          {  "source":6,
            "target":3,
            "value": links[8].value

          },
           {  "source":7,
            "target":0,
            "value": links[9].value

          },
          {  "source":7,
            "target":1,
            "value": links[10].value

          },
          {  "source":7,
            "target":2,
            "value": links[11].value

          },
          ];


        var d =graph.nodes(nodes).links(test).layout(32);


       var link = svg.append("g").selectAll(".link")
       .data(test)
         .enter().append("path")
         .attr("class", "link")
         .attr("d", path)
         .style("stroke", function (d) {
           return colors1[d.source.name];
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
            return "translate(" + d.x + "," + d.y + ")"; });

        node.append("rect")
          .attr("height", function(d) { return d.dy; })
          .attr("width", graph.nodeWidth())
          .style("fill", function(d){
            return colors1[d.name] || colors2[d.name];
          })
     });

   }
})();
