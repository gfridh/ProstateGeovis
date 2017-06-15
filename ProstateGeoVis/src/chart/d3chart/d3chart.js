import * as d3 from "d3";

let d3Chart = {}

d3Chart.create = function(element, props, state) {
  let svg = d3.select(element).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height)

  svg.append('g')
    .attr('class', 'd3-chart')

  this.update(element, state)
}

d3Chart.update = function(element, state) {
  let scales = this._scales(element, state.domain)
  this._drawPoints(element, scales, state.data)
}

d3Chart._scales = function(element, domain) {
  if (!domain) {
    return null
  }

  let width = element.offsetWidth
  let height = element.offsetHeight

  let x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x)

  let y = d3.scaleLinear()
    .range([height, 0])
    .domain(domain.y)

  let z = d3.scaleLinear()
    .range([5, 20])
    .domain([1, 10])

  return {x: x, y: y, z: z}
}

d3Chart._drawPoints = function(element, scales, data) {
  let g = d3.select(element).selectAll('.d3-chart')
  let points = g.selectAll('.d3-point')
    .data(data, d => d.id)

  points.enter().append('circle')
    .attr('class', 'd3-point')
    .attr('width', '100')
    .attr('height', '100')
    .attr('r', '100')
    .attr('cx', d => scales.x(d.x))
    .attr('cy', d => scales.y(d.y))
    .attr('cz', d => scales.z(d.z))
    .style('fill', '#000')

  points.exit().remove()
}

export default d3Chart
