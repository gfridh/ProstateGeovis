import React, { Component } from 'react'

import * as d3 from 'd3'

import './lost-and-found.css'

class LostAndFound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      municipalities: [],
      people: this.props.people,
      filtered: this.props.people,
      data: [],
      filters: { regions: new Set() }
    }

    // set the dimensions and margins of the graph
    this.margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    }
    this.width = 300 - this.margin.left - this.margin.right
    this.height = 500 - this.margin.top - this.margin.bottom

    // set the ranges
    this.x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);
    this.y = d3.scaleLinear()
      .range([this.height, 0]);
  }

  componentWillReceiveProps(newProps) {
    let filters = this.state.filters
    filters.regions = newProps.regions
    this.setState({ filters: filters }, () => {
      this.makeDataGroups()
    })
  }

  makeDataGroups() {
    let LnF = this;

    let { links } = this.props.data
    LnF.state.data = [{
      category: 'After PSA',
      count: links.find(link => link.desc === "PSA -> Missing").value
    }, {
      category: 'After diagnose',
      count: links.find(link => link.desc === "Diagnos -> Missing").value
    }]
    LnF.updateBarChart()
  }

  updateBarChart() {
    this.x.domain(this.state.data.map(d => d.category))
    this.y.domain([0, d3.max(this.state.data.map(d => d.count || 0))])

    // HURRA JAVASCRIPT
    let x = this.x;
    let y = this.y;
    let stateData = this.state.data;
    let height = this.height;
    let width = this.width;
    let margin = this.margin;

    var current = d3.select("#barchart").selectAll(".bar")
    current.remove()

    var svg = d3.select('#barchart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')

      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('.bar')
      .data(stateData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.category || 0))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.count || 0))
      .attr('height', (d) => height - y(d.count || 0))
    .append('title')
      .text(d => d.count)

    var axis = d3.select('#barchart').selectAll('.axis')
    axis.remove()

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'axis')
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));


  }

  getArrayAverage(array) {
    let sum = array.reduce(function(a, b) {
      return a + b;
    });
    let avg = sum / array.length;
    return avg
  }

  render() {
    return (
      <div className="cool_placeholder">
        <svg id="barchart"></svg>
        <h5>Number of people gone missing per stage</h5>
      </div>
    )
  }
}

export default LostAndFound
