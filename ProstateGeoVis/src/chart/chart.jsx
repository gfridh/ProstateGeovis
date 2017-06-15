import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
// import './chart.css'

import d3Chart from './d3chart/d3chart.js'

class Chart extends Component {
  componentDidMount() {
    let element = ReactDOM.findDOMNode(this)
    d3Chart.create(element, {
      width: '100%',
      height: '600px'
    }, this.getChartState())
  }

  componentDidUpdate() {
    let element = ReactDOM.findDOMNode(this)
    d3Chart.update(element, this.getChartState())
  }

  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    }
  }

  componentWillUnmount() {
    let element = ReactDOM.findDOMNode(this)
    d3Chart.destroy(element)
  }

  render() {
    return (
      <div className="Chart"></div>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.object
}

export default Chart
