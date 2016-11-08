function D3srv() {
}

D3srv.prototype = {
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
    return d3.select(c).append("svg").attr("width", w).attr("height", h);
  },
  // linear scale output  with color
  getScaleLinearColors: function () {
    return d3.scale.linear().range(["#FE5E87", "#678FFE", "#81DF49", "#FCCE48"]);
  },
  readCSV: function (filePath, cb) {
    d3.csv(filePath, function (data) {
      cb(data);
    });
  },
  readJSON: function (filePath, cb) {
    d3.json(filePath, function (data) {
      cb(data);
    });
  },
  displayBubbles: function (svg, data, projection) {
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.coordinate.long, d.coordinate.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.coordinate.long, d.coordinate.lat])[1];
      })
      .attr("r", function (d) {
        return Math.sqrt(d.total) * 1.5;
      })
      .style("fill", "#1BE4E5")
      .style("opacity", 0.6)
      .style("stroke", "#fff")
      .style("stroke-width", 3);
  }
};
