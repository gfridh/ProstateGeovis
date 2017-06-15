import React, { Component } from 'react'
import * as d3Sankey from 'd3-sankey'
import * as d3 from 'd3'

import '../lenses/sankey.css'

const COLOR_SCHEME = ['#ec5f67', '#f99157', '#fac863', '#99c794', '#77b2b1', '#5fb3b3', '#6699cc', '#c594c5', '#927293']

class Sankey extends Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.drawSankey = this.drawSankey.bind(this)
    this.updateSankey = this.updateSankey.bind(this)
    this.state = {
      rendered: false,
      filters: { regions: new Set()}
    }
  }

  componentDidMount() {
    // todo aggregate per municipality
    this.initSankey()
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.rendered) {
      this.setState({ rendered: true }, () => {
        this.drawSankey()
      })
    } else {
      let filters = this.state.filters
      filters.regions = newProps.regions
      this.setState({ filters: filters }, () => {
        this.updateSankey()
      })
    }
  }

  initSankey() {
    this.width = document.documentElement.clientWidth * 0.50
    this.height = document.documentElement.clientHeight * 0.6

    const margin = 20

    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', this.width + margin)
      .attr('height', this.height + margin)
      .append('g')

    this.sankey = d3Sankey.sankey()
      .nodeWidth(5)
      .nodePadding(10)
      .size([this.width, this.height])

    this.path = this.sankey.link()

    // ['#EF476F', '#FFD166', '#06D6A0', '#26547C', '#AE759F', '#392759', '#F7ACCF', '#01BAEF', '#F4A261'
    this.color = d3.scaleOrdinal()
          // .range(['#EF476F', '#FFD166', '#06D6A0', '#26547C', '#AE759F', '#392759', '#F7ACCF', '#01BAEF', '#F4A261'])
          .range(COLOR_SCHEME)
          .domain(d3.range(0, COLOR_SCHEME.length));
  }

  drawSankey() {
    let { nodes, links } = this.props.data

    this.sankey
      .nodes(nodes)
      .links(links)
      .layout(32)

    let link = this.svg.append('g')
      .selectAll('.link')
      .data(links)
      .enter()
    .append('path')
      .attr('class', 'link')
      .attr('d', this.path)
      .style('stroke-width', (d) => (Math.max(1, d.dy) + 'px'))
      .sort((a, b) => b.dy - a.dy)

    link
      .append('title')
      .text(d => `${d.source.name} → ${d.target.name} \n ${d.value}`)

    let node = this.svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
    .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return `translate(${d.x},${d.y})`
      })
    node.append('rect')
      .attr('height', (d) => d.dy)
      .attr('width', this.sankey.nodeWidth())
      .style('fill', (d) => { return d.color = this.color(d.name.replace(/ .*/, "")) })
      // .style('stroke', (d) => { return d3.rgb(d.color).darker(2) })
    .append('title')
      .text((d) => { return d.name + "\n" + d.value })

    node.append('text')
      .attr('x', -6)
      .attr('y', (d) => d.dy / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text((d) => d.name)
      .filter((d) => d.x < this.width / 2)
      .attr('x', 6 + this.sankey.nodeWidth())
      .attr('text-anchor', 'start')
  }

  updateSankey() {
    let { nodes, links } = this.props.data
    this.path = this.sankey.link()

    this.sankey
      .nodes(nodes)
      .links(links)
      .layout(32)

    this.sankey.relayout()

    this.svg.selectAll('.link')
      .data(links)
      .transition()
      .duration(1000)
      .attr('d', this.path)
      .style('stroke-width', (d) => (Math.max(1, d.dy) + 'px'))

    this.svg.selectAll('.link title')
      .data(links)
      .text(d => `${d.source.name} → ${d.target.name} \n ${d.value}`)

    this.svg.selectAll('.node')
      .data(nodes)
      .transition()
      .duration(1000)
      .attr('transform', (d) => {
        return "translate(" + d.x + "," + d.y + ")"
      })

    this.svg.selectAll('.node rect')
      .data(nodes)
      .transition()
      .duration(1000)
      .attr('height', (d) => d.dy + 'px')

    this.svg.selectAll('.node rect title')
      .data(nodes)
      .text((d) => { return d.name + "\n" + d.value })

    this.svg.selectAll(".node text")
      .attr('y', (d) => d.dy / 2)
      .text((d) => d.name)
      .filter((d) => d.x < this.width / 2)
  }

  render() {
    return (
      <div className="sankey-container">
        { this.state.rendered ? '' : <h3>Loading...</h3> }
        <div id="chart"></div>
        <h4>The flow of prostate cancer treatment</h4>
      </div>
    )
  }
}

Sankey.propTypes = {}

export default Sankey
