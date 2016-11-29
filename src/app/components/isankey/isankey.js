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

  function isankeyController(Firebaseio, ContainerSrv, $window, $scope) {
    $scope.data = options;

    var io = Firebaseio;
    var elm = angular.element(document.querySelector(".sankey-diagram"))[0];
    var w = elm.clientWidth - 35;
    var h = elm.clientHeight - 100;

    var svg = d3.select(".sankey-diagram").append("svg")
      .attr("width", w + 35)
      .attr("height", h + 400)
      .append("g")
      .attr("transform", "translate(" + 20 + "," + 15 + ")");

    var graph = d3.sankey().nodeWidth(15).nodePadding(15).size([w, h]);
    var path = graph.link();

    this.service = ContainerSrv;

    var ref = null;
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
          })

        rect.transition()
          .duration(2000)
          .attr("width", graph.nodeWidth());
      });
    });
  }

  function balance(mnode, graph) {
    if(mnode.length>10){
    var current=0;
    var second=0;
    var third=0;

    for(var i=mnode.length-7;i<mnode.length-4;++i){
      if(mnode[current].y>mnode[i].y){
        third=second;
        second=current;
        current=i;
      }
      else if(mnode[second].y>mnode[i].y){
        third=second;
        second=i;
      }
      else if(mnode[third].y>mnode[i].y){
        third=i;
      }
    }

    var ecurrent=mnode.length-4;
    var esecond=mnode.length-4;
    var ethird=mnode.length-4;

    for(var i=mnode.length-3;i<mnode.length;++i){
      if(mnode[ecurrent].y>mnode[i].y){
        ethird=esecond;
        esecond=ecurrent;
        ecurrent=i;
      }
      else if(mnode[esecond].y>mnode[i].y){
        ethird=esecond;
        esecond=i;
      }
      else if(mnode[ethird].y>mnode[i].y){
        ethird=i;
      }
    }
    //
    // console.log(mnode);
    // console.log(ecurrent);
    // console.log(esecond);
    // console.log(ethird);

    var top=0.0;
    var amount=mnode[current].y-top;
    // console.log(anode)
    move(mnode[second],2, amount, graph);
    move(mnode[third],3, amount, graph);
    move(mnode[current],1, amount, graph);

    move(mnode[esecond],2, amount, graph);
    move(mnode[ethird],3, amount, graph);
    move(mnode[ecurrent],1, amount, graph);
  }
  else if(mnode.length>8){
    current=1;
    var top=0.0;
    var amount=mnode[current].y-top;
      move(mnode[current],1, amount, graph);
  }
  }

  function move(node, val,amount, graph) {
    if(val==1){
      d3.select(this).attr("transform", "translate(" + (node.x =node.x)
      + "," + (
        node.y =node.y-amount
      ) + ")");
    }
    else{
      d3.select(this).attr("transform",
      "translate(" + (
        node.x =node.x
      )
      + "," + (
        node.y =node.y-amount+(15*val)
      ) + ")");
    }
    graph.relayout();
  }
})();
