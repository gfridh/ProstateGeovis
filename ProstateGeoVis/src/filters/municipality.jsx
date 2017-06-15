import React, { Component } from 'react'

import { municipalities } from 'services/municipalities'

class MunicipalityFilter extends Component {
  constructor(props) {
    super(props)
    this.handleFilterChange = this.handleFilterChange.bind(this)

  }

  handleFilterChange(event) {
    this.props.onFilterChange(event.target.value)
  }

  render() {
    return (
      <select onChange={this.handleFilterChange}>
      <option value="">No filter</option>
      {
        municipalities.map(region => {
          return (
            <option key={region} value={region}>
              {region}
            </option>
          )
        })
      }
      </select>
    )
  }
}

export default MunicipalityFilter
