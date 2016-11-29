(function () {
  'use strict'
  angular
  .module('app')
  .component('ibubble', {
    templateUrl: 'app/components/ibubble/ibubble.html',
    controller: ibubbleController
  });

  var options = {
     availableOptions: [
       {id: '1', name: 'Default'},
       {id: '2', name: 'Age'},
       {id: '3', name: 'Sex'},
       {id: '4', name: 'Tenure'},
       {id: '5', name: 'Marital Status'},
       {id: '6', name: 'Relationship to House'},
       {id: '7', name: 'Educational Attainment'}
     ],
     selectedOption: {id: '1', name: 'Default'}
   };

  var colors = ["#F06292", "#e57373", "#BA68C8", "#DCE775",
    "#70DCDC", "#FFD54F", "#D0B3DF", "#FAB9C6", "#7986CB",
    "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
    "#AED581", "#FFF176", "#FFB74D"];

  function ibubbleController(Firebaseio, ContainerSrv, $scope) {
    $scope.data = options;

    var elm = angular.element(document.querySelector(".ibubble"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;

    this.service = ContainerSrv;

    var diameter = w;
    var bubble = d3.layout.pack()
      .size([w, h - 100])
      .padding(5)
      // .sort(null);

    var svg = d3.select(".ibubble").append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bubble");

    $scope.$watchGroup(['$ctrl.service.sharedYear', 'data.selectedOption'], function (it) {
      if (it[0] < 2007 && (it[1].name === 'Relationship to House' || it[1].name === 'Educational Attainment')) {
        swal({
          title: 'WE ARE SORRY',
          text: 'We do not have "' + it[1].name + '" filtered data from 2001 to 2007!',
          imageUrl: '../../../img/sad.png',
          imageWidth: 200,
          imageHeight: 220,
          // animation: false,
          confirmButtonColor: '#25b7c4',
          imageClass: 'animated rubberBand'
        });
      } else {
        svg.selectAll("circle")
          .transition()
          .duration(2000)
          .attr("r", function (d) {
            return 0;
          });
        displayBubbles(Firebaseio, it, svg, bubble);
      }
    });
  }

  function displayBubbles(io, it, svg, bubble) {
    io.getDataForBubbleGraph(it[0], it[1].name, function(error, data) {
      if (error) {
        throw error;
      }

      data = data.map(function (d) {
        d.value = +parseInt((d.value).replace(',', ''));
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
          return colors[d.index % 17];
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
