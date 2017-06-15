import React, { Component } from 'react'
import './app.css'
import './css/bootstrap.min.css'

import SvgMap from './svg-map/svg-map.jsx'
import LensSelector from 'lens-selector/lens-selector.jsx'

import PreLens from 'lens_pre/lens_pre'
import Missing from 'lenses/missing/missing'
import Death from 'lenses/death/death'

import Credits from 'credits/credits'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      loaded: false,
      filters: {},
      mapData: {},
      activeRegions: new Set(),
      lens: '',
      regionSelectionEnabled: false
    }
    this.onMunicipalityFilterChange = this.onMunicipalityFilterChange.bind(this)
    this.onAgeFilterChange = this.onAgeFilterChange.bind(this)
    this.colorMap = this.colorMap.bind(this)
    this.setActiveRegions = this.setActiveRegions.bind(this)
    this.handleLensChange = this.handleLensChange.bind(this)
  }

  onMunicipalityFilterChange(value) {
    let filters = this.state.filters
    filters.municipality = value
    this.setState({ filters: filters })
  }

  onAgeFilterChange(value) {
    let filters = this.state.filters
    filters.age = value
    this.setState({ filters: filters })
  }

  colorMap(data) {
    this.setState({ mapData: data }, () => {
      console.log("mapData", this.state.mapData)
    })
  }

  setActiveRegions(data) {
    this.setState({ activeRegions: data })
  }

  getCurrentLens() {
    if (this.state.lens == 'sankey') {
      return (<Missing regions={this.state.activeRegions}
                setActiveRegions={this.setActiveRegions}
                updateMap={this.colorMap} />)
    } else if (this.state.lens == 'death') {
      return (<Death
                regions={this.state.activeRegions}
                setActiveRegions={this.setActiveRegions} />)
    } else if (this.state.lens == 'pre_lens') {
      return (<PreLens
                regions={this.state.activeRegions}
                setActiveRegions={this.setActiveRegions}
                colorMap={this.colorMap} />)
    } else if (this.state.lens == 'credits') {
      return (<Credits />)
    }
  }

  handleLensChange(lens) {
    this.setState({ lens: lens, regionSelectionEnabled: lens == '' ? false : true})
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-12">
                  <SvgMap
                    mapData={this.state.mapData}
                    regions={this.state.activeRegions}
                    setActiveRegions={this.setActiveRegions}
                    manualSelectionEnabled={this.state.regionSelectionEnabled}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-7 lens-container">
              { this.state.lens == '' &&
                <LensSelector handleLensChange={this.handleLensChange} />
              }
              { this.getCurrentLens() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
