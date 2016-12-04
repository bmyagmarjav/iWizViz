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

  var reasons = {
    'Change in marital status': "#F06292",
    'Change of climate': "#e57373",
    'Health reasons': "#BA68C8",
    'New job or job transfer': "#DCE775",
    'Other family reason': "#70DCDC",
    'Other housing reason': "#FFD54F",
    'Other job related reason': "#D0B3DF",
    'Other reasons': "#FAB9C6",
    'Retired': "#7986CB",
    'To attend or leave college': "#64B5F6",
    'To be closer to work or easier commute': "#4FC3F7",
    'To establish own household': "#4DD0E1",
    'To look for work or lost job': "#4DB6AC",
    'Wanted better neighborhood - less crime': "#81C784",
    'Wanted cheaper housing': "#AED581",
    'Wanted new or better home - apartment': "#FFF176",
    'Wanted own home': "#FFB74D"
  };

  function ibubbleController(Firebaseio, ContainerSrv, $scope) {
    $scope.model = reasons;
    $scope.colors = colors;

    $scope.data = options;

    var elm = angular.element(document.querySelector(".ibubble"))[0];
    var w = elm.clientWidth;
    var h = elm.clientHeight;

    this.service = ContainerSrv;

    var diameter = w;
    var bubble = d3.layout.pack()
      .size([w, h - 100])
      .padding(5)
      .sort(null);

    var svg = d3.select(".ibubble").append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bubble");

    var tooltip = d3.select(".ibubble").append("div")
      .attr("class", "tooltip tbubble")
      .style("opacity", 0);

    $scope.$watchGroup(['$ctrl.service.sharedYear', 'data.selectedOption'], function (it) {
      if (it[0] < 2007 && (it[1].name === 'Relationship to House' || it[1].name === 'Educational Attainment')) {
        swal({
          title: 'WE ARE SORRY',
          text: 'We do not have "' + it[1].name + '" filtered data from 2001 to 2006!',
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
        displayBubbles(Firebaseio, it, svg, bubble, tooltip);
      }
    });
  }

  function displayBubbles(io, it, svg, bubble, tooltip) {
    io.getDataForBubbleGraph(it[0], it[1].name, function(error, data) {
      if (error) {
        throw error;
      }
      console.log(data);
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
        .attr("transform", "translate(0, 10)")
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
          return reasons[d.reason];
        })
        .style("stroke", "#fff")
        .style("stroke-width", 4);

      circles.on("mouseover", function (d) {
          tooltip.transition().duration(500).style("opacity", 0.9);
          if (it[1].name === "Default") {
            tooltip.html(d.value + "000 people")
              .style("height", "40px");
          } else {
            tooltip.html(d.value + "000 people </br>" + it[1].name + ": " + d.demogr)
              .style("height", "60px");
          }
          if (it[1].name === "Tenure") {
            tooltip.style("height", "80px");
          }
          if (it[1].name === "Marital Status"
            || it[1].name === "Relationship to House"
            || it[1].name === "Educational Attainment") {
            tooltip.style("height", "100px");
          }
          tooltip.style("top", (event.pageY-10) - 150 + "px")
            .style("left", (event.pageX+10) - 400 + "px");
        })
        .on("mouseout", function (d) {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      circles.transition()
        .duration(2000)
        .attr("r", function (d) {
          return d.r;
        });

    });
  }
})();
