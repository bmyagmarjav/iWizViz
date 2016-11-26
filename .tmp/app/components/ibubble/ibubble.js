(function () {
  'use strict'
  angular
  .module('app')
  .component('ibubble', {
    templateUrl: 'app/components/ibubble/ibubble.html',
    controller: ibubbleController
  });

  var colors = ["#F06292", "#e57373", "#BA68C8", "#DCE775",
    "#70DCDC", "#FFD54F", "#D0B3DF", "#FAB9C6", "#7986CB",
    "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
    "#AED581", "#FFF176", "#FFB74D"];

  function ibubbleController(Firebaseio) {
    var elm = angular.element(document.querySelector(".ibubble"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;

    var diameter = w;
    var bubble = d3.layout.pack()
      .size([w, h - 60])
      .padding(5)
      // .sort(null);

    var svg = d3.select(".ibubble").append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bubble");

    Firebaseio.getReasons('2001', function(error, reason) {
      if (error) {
        throw error;
      }

      var data = [];
      var i = 0;
      Object.keys(reason).forEach(function(key){
        data.push({
          index: i++,
          reason: reason[key]
        });
      });

      data = data.map(function (d) {
        d.value = +parseInt((d.reason["Total"]).replace(/,/g, ''));
        return d;
      });

      var nodes = bubble.nodes({children: data})
        // .filter(function (d) {
        //   return !d.children;
        // });
      //setup the chart
      var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

      //create the bubbles
      var circles = bubbles.append("circle")
        .attr("r", function(d){ return 0; })
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        })
        .style("fill", function(d) {
          if (d.depth === 0) {
            return "rgb(240, 243, 244)"; // returns background circle
          }
          return colors[d.index];
        })
        .style("stroke", "#fff")
        .style("stroke-width", 4);

      circles.transition()
        .duration(2000)
        .attr("r", function (d) {
          return d.r;
        });
    });
  }
})();
