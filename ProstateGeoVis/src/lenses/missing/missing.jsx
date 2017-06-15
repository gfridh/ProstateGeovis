import React, { Component } from 'react'

import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

import './missing.css'

import { sankey } from 'services/people'

import Sankey from 'lenses/sankey'
import LostAndFound from 'lenses/lost-and-found/lost-and-found'

class Missing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        psa: [0, 10000],
        age: [0, 100],
        regions: new Set()
      },
      data: {}
    }

    this.handlePsaFilterChange = this.handlePsaFilterChange.bind(this)
    this.handleAgeFilterChange = this.handleAgeFilterChange.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.update()
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify([...newProps.regions]) != JSON.stringify(this.state.filters.regions)) {
      let filters = this.state.filters
      filters.regions = [...newProps.regions]
      this.setState({ filters: filters }, () => {
        this.update()
      })
    }
  }

  update() {
    sankey(this.state.filters).then(response => {
      this.setState({ data: response })
      this.props.updateMap(response.regions)
    })
  }

  handlePsaFilterChange(bounds) {
    let filters = this.state.filters
    filters.psa = bounds
    if (bounds[1] === 20) {
      filters.psa[1] = 10000
    }
    this.setState({ filters: filters }, () => {
      this.update()
    })
  }

  handleAgeFilterChange(bounds) {
    let filters = this.state.filters
    filters.age = bounds
    this.setState({ filters: filters }, () => {
      this.update()
    })
  }

  render() {
    return (
      <div className="missing-lens-container">
        <h4 className="selected-regions">Showing { Array.from(this.props.regions).join(', ') || 'all regions' }</h4>
        <div className="range-container">
          <h4>Filter by PSA values</h4>
          <p>({ this.state.filters.psa.join(', ') })</p>
          <Range
            min={0}
            max={20}
            defaultValue={[0, 20]}
            included={false}
            count={2}
            step={1}
            pushable={1}
            marks={{0: '0', 5: '5', 10: '10', 15: '15', 20: '20+'}}
            onAfterChange={this.handlePsaFilterChange}
          />
        </div>
        <div className="range-container">
          <h4>Filter by age</h4>
          <p>({ this.state.filters.age.join(', ') })</p>
          <Range
            min={0}
            max={100}
            defaultValue={[0, 100]}
            included={false}
            count={2}
            step={5}
            pushable={1}
            marks={{0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100'}}
            onAfterChange={this.handleAgeFilterChange}
          />
        </div>
        <Sankey data={this.state.data} regions={this.state.filters.regions} />
        <LostAndFound data={this.state.data} regions={this.state.filters.regions} />
      </div>
    )
  }
}

export default Missing
