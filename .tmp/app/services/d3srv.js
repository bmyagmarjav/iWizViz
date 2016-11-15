var colors = ["#70DCDC", "#59A0D5", "#D0B3DF", "#FAB9C6"];
var regionLegend = ["West", "Midwest", "South", "Northeast"];

function D3srv() {
}

D3srv.prototype = {
  flowmap: {
    selectWindow: function () {
      return d3.select(window);
    },
    getAlberUsa: function () {
      return d3.geo.albersUsa();
    },
    getPath: function () {
      return d3.geo.path();
    },
    getGraticule: function () {
      return d3.geo.graticule();
    },
    // Create SVG element and append map to the SVG
    getSVG: function (c, w, h) {
      return d3.select(c).append("svg")
        .attr("class", "map")
        .attr("width", w)
        .attr("height", h);
    },
    // linear scale output  with color
    getScaleLinearColors: function () {
      return d3.scale.linear().range(colors);
    },
    displayGeoPath: function (svg, features, path, color) {
      // Bind the data to the SVG and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", 1)
        .style("fill", function (d) {
          var value = d.properties.region;
          return color(value);
        });
    },
    displayBubbles: function (svg, data, projection, w) {
      return svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          console.log(d);
          return projection([d.coordinate.long, d.coordinate.lat])[0];
        })
        .attr("cy", function (d) {
          return projection([d.coordinate.long, d.coordinate.lat])[1];
        })
        .attr("r", function (d) {
          return 0;
        })
        .style("fill", "rgb(151, 181, 181)")
        .style("opacity", 0.6)
        .style("stroke", "#fff")
        .style("stroke-width", 2);
    },
    addLegend: function (c, color, w, h) {
      var legend = d3.select(c).append("svg")
        .attr("class", "legend")
        .attr("width", w / 5)
        .attr("height", h / 6)
        .selectAll("g")
        .data(color.domain().slice())
          .enter()
          .append("g")
          .attr("transform", function (d, i) {
            return "translate(0," + ((i * w / 48) + w / 280) + ")";
          });
      legend.append("rect")
        .attr("width", w / 72)
        .attr("height", w / 72)
        .style("fill", color);

      legend.append("text")
        .data(regionLegend)
        .attr("x", w / 48)
        .attr("y", w / 280)
        .attr("dy", ".50em")
        .style("fill", "rgb(151, 181, 181)")
        .style('font-size', w / 48 + 'px')
        .text(function (d) {
          return d;
        });
    },
    drawLines: function (svg, data, projection, index) {
      var x2 = projection([data[index].coordinate.long, data[index].coordinate.lat])[0];
      var y2 = projection([data[index].coordinate.long, data[index].coordinate.lat])[1];
      for (var i = 0; i < 4; i++) {
        var x1 = projection([data[i].coordinate.long, data[i].coordinate.lat])[0];
        var y1 = projection([data[i].coordinate.long, data[i].coordinate.lat])[1];
        svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x1)
        .attr("y2", y1)
        .attr("stroke-width", 3)
        .attr("stroke", "rgb(251, 144, 51)")
          .transition()
          .duration(1000)
          .ease("linear")
          .attr("x2", x2)
          .attr("y2", y2);
      }
    },
    removeLines: function (svg) {
      d3.selectAll("line").remove();
    },
    // Define the div for the tooltip
    getTooltip: function () {
      return d3.select(".flowmap").append("div")
        .attr("class", "flowmap-tooltip")
        .style("opacity", 0);
    },
    tooltip: {
      hide: function (div) {
        div.transition().duration(500).style("opacity", 0);
      },
      show: function (div) {
        div.transition().duration(500).style("opacity", 1);
      }
    }
  }
};
