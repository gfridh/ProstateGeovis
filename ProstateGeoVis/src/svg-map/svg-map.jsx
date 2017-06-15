import React, { Component } from 'react'
import InlineSvg from 'react-inlinesvg'
import * as d3 from 'd3'
import _ from 'lodash'

import './svg-map.css'

class SvgMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      value: ""
     }
    this.updateTitle = this.updateTitle.bind(this)
    this.updateActiveRegions = this.updateActiveRegions.bind(this)
    this.setColor = this.setColor.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.regionMatcher = new RegExp("^[^_]*(?=_)")
  }

  updateTitle(region) {
    if (region !== '') {
      const Region = region[0].toUpperCase() + region.slice(1)
      // this.setState({ title: Region, value: this.props.mapData[region].value })
      this.setState({ title: Region })
    }
  }

  setColor() {
    let max = 1
    if (!_.isEmpty(this.props.mapData)) {
      let values = Object.values(this.props.mapData)
      max = d3.max(values)
    }
    let color = d3.scaleLinear()
      .domain([1, max])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')])

    d3.select("#lanet").selectAll("path")
      .style("stroke", (_,i,nodeList) => {
        const reg = this.regionMatcher.exec(nodeList[i].id)[0]
        return this.props.regions.has(reg) ? "#F5A503" : "blue"
      })
      .style("stroke-width", (_, i, nodeList) => {
        const reg = this.regionMatcher.exec(nodeList[i].id)[0]
        return this.props.regions.has(reg) ? 10 : 0
      })
      .style("fill",(_,i,nodeList) => {
        const reg = this.regionMatcher.exec(nodeList[i].id)[0]
        if (reg in this.props.mapData) {
          // return this.props.mapData[reg].color
          return color(this.props.mapData[reg]) //If you have custom color for a munip, it will be set here
        }
        else {
          return "" //Change default collor here
        }
      })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.manualSelectionEnabled !== nextProps.manualSelectionEnabled) {
      if(nextProps.manualSelectionEnabled) {
        d3.select("#lanet").selectAll("path")
          .classed("highlight", true)
      } else {
        d3.select("#lanet").selectAll("path")
        .classed("highlight", false)
      }
    }
  }
  updateActiveRegions(event) {
    const selectedRegion = event.target.parentNode.id //.replace(/^[a-z]/, (x) => {return x.toUpperCase()})
    if (selectedRegion === '') {
      return
    }
    const currentRegions = new Set([...this.props.regions])
    if(!currentRegions.delete(selectedRegion))
      currentRegions.add (selectedRegion)
    this.props.setActiveRegions(currentRegions)
  }

  handleMapClick(event) {
    if (this.props.manualSelectionEnabled) {
      console.log("handling click")
      this.updateActiveRegions(event)
    }
  }

  handleMouseOver(event) {
    const region = event.target.parentNode.id
    this.updateTitle(region)
  }

  componentDidUpdate() {
    this.setColor()
  }

  render() {
    return (
      <div onClick={this.handleMapClick} onMouseOver={this.handleMouseOver}>
        <header className="map-header transparent">
          <h3>{this.state.title}</h3>
          <h4>{this.state.value}</h4>
        </header>
        <InlineSvg src={process.env.PUBLIC_URL + '/map.svg'} uniquifyIDs={false}>
          <p>Map not found</p>
        </InlineSvg>
      </div>
    )

  }
}

export default SvgMap
