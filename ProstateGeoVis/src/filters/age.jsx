import React, { Component } from 'react'
// import './municipality.css'

class AgeFilter extends Component {
  constructor(props) {
    super(props)
    this.handleMinChange = this.handleMinChange.bind(this)
    this.handleMaxChange = this.handleMaxChange.bind(this)
    this.state = {
      min: 1,
      max: 99
    }
  }

  handleMinChange(event) {
    this.setState({ min: event.target.value })
    let filter = {
      min: +this.state.min,
      max: +this.state.max
    }
    // this.props.onFilterChange(event.target.value)
    this.props.onFilterChange(filter)
  }

  handleMaxChange(event) {
    this.setState({ max: event.target.value })
    let filter = {
      min: +this.state.min,
      max: +this.state.max
    }
    // this.props.onFilterChange(event.target.value)
    this.props.onFilterChange(filter)
  }

  render() {
    return (
      <div>
        <input type='number' name='min' value={this.state.min} onChange={this.handleMinChange}/>
        <input type='number' name='max' value={this.state.max} onChange={this.handleMaxChange}/>
      </div>
    )
  }
}

export default AgeFilter
