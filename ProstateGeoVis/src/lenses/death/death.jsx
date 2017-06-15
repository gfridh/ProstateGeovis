import React, { Component } from 'react'

import './death.css'

const deathCSV = require('../../../dataset/team_death.csv')

// import * as d3 from 'd3.promise'
const d3 = require('d3')

var dimensions

class Death extends Component {
  constructor(props) {
    super(props)
    this.state = {
      municipalities: [],
      people: this.props.people,
      filtered: this.props.people,
      selected: [], // this.props.regions // TODO: Change to props value :D
      brushed: null
    }

    this.deathLens = this.deathLens.bind(this)
  }

  componentDidMount() {
    this.deathLens()
  }

  deathLens() {
    const clientWidth = document.documentElement.clientWidth * 0.6

    var m = [10, 10, 10, 10],
    w = clientWidth - m[1] - m[3],
    h = 500 - m[0] - m[2];

    let reactComponent = this;

    var x = d3.scaleBand().rangeRound([15, w], 1),
    y = {},
    dragging = {};

    var line = d3.line(),
    axis = d3.axisLeft(),
    background,
    foreground;

    d3.selectAll("canvas")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .style("padding", m.join("px ") + "px");

    var svg = d3.select(".death")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    d3.csv(deathCSV, function(municipalities) {
      // Extract the list of dimensions and create a scale for each.
      x.domain(dimensions = d3.keys(municipalities[0]).filter(function(d) {
        return d !== "municipality" && (y[d] = d3.scaleLinear()
            .domain(d3.extent(municipalities, function(p) { return +p[d]; }))
            .range([h, 0]));
      }));

      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Add grey background lines for context.
      background = svg.append("g")
          .attr("class", "background")
        .selectAll("path")
          .data(municipalities)
        .enter().append("path")
          .attr("d", path)
          .style("opacity", 0);

      // Add blue foreground lines for focus.
      foreground = svg.append("g")
          .attr("class", "foreground")
        .selectAll("path")
          .data(municipalities)
        .enter().append("path")
          .attr("d", path)
          .on("mouseover", function(d) {
            div.style("opacity", .9);
            div.html(d.municipality)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
          .on("mouseout", function(d) {
            div.transition()
                .delay(1500)
                .duration(500)
                .style("opacity", 0);
            });

      // Add a group element for each dimension.
      var g = svg.selectAll(".dimension")
        .data(dimensions)
      .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.drag()
          .subject(function(d) { return {x: x(d)}; })
          .on("start", function(d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function(d) {
            dragging[d] = Math.min(w, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
          })
          .on("end", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            background
                .attr("d", path)
              .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
          }));

      // Add an axis and title.
      // Set title for axis
      g.append("g")
        .attr("class", "axis")
        .each(function(d) {
          d3.select(this).call(axis.scale(y[d]));
        })
        .append("svg:text")
        .attr("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) {
          return d
        });


      // Add and store a brush for each axis.
      // this right here is the frame surrounding the axis
      g.append("svg:g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(y[d].brush = d3.brushY().extent([[-5, 0], [5, h]]).on("start", brushstart).on("brush", brush).on("end", brushend));
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16)


      // Handles a brush event, toggling the display of foreground lines.
      function brush() {
        var actives = activebrushes(),
        extents = brushextents(actives);

        foreground.style("display", function(d) {
          return actives.every(function(p, i) {
            var state = reactComponent.state.selected;
            return extents[i][0] <= d[p] && d[p] <= extents[i][1] && (state.length === 0 || state.indexOf(d.municipality) !== -1);
          }) ? null : "none";
        }).style("opacity", 1);

        background.style("opacity", function(d) {
          return (actives.every(function(p, i) {
            return extents[i][0] > d[p] || d[p] > extents[i][1];
          })) ? 0.65 : 1;
        });

      }

      function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
      }

      function transition(g) {
        return g.transition().duration(500);
      }


      function path(d) {
        return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
      }


      function activebrushes() {
        return dimensions.filter(function (p) {
          return (getbrush(p) != null)
        });
      };

      function brushextents(bs) {
        return bs.map(function(p) {
          var yscale = getbrush(p);
          return [y[p].invert(yscale[1]), y[p].invert(yscale[0])];
        })
      };

      function getbrush(b) {
        return d3.brushSelection(d3.selectAll(".brush").filter(function(d) { return d === b }).node());
      }

      function brushstart() {
        d3.event.sourceEvent.stopPropagation();
      }

      function brushend() {
        if(d3.select(this).select(".selection").node().height.animVal.value === 0)
          brush();

        var actives = activebrushes(),
          extents = brushextents(actives);

        var brushed = foreground.filter( function (d) {
          return (actives.every(function(p, i) {
            return extents[i][0] < d[p] && d[p] < extents[i][1];
          }))
        })

        brushed = new Set(brushed.data().map(function (d) {return d.municipality.toLowerCase(); }));
        reactComponent.props.setActiveRegions(brushed)
      }
    });
}

  render() {
    return (
      <div className="row death-row">
        <div className="col-sm-12">
            <h1>Death Statistics</h1>
            <div id="chart">
              <svg className="death"></svg>
            </div>
        </div>
      </div>
    )
  }

  getArrayAverage(array) {
    let sum = array.reduce(function(a, b) {
      return a + b;
    });
    let avg = sum / array.length;
    return avg
  }

}

export default Death
