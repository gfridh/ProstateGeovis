import React, { Component } from 'react'
import './credits.css'

import * as Contributions from './people'

class Credits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: ''
    }

    this.setVisible = this.setVisible.bind(this)
  }

  setVisible(event) {
    console.log(event)
    this.setState({ visible: event.currentTarget.dataset.id })
  }

  render() {
    return (
      <div className="credits">
          <h1>Credits</h1>
          <ul>
            <li><a data-id="aron" onClick={this.setVisible}> Aron Strandberg</a></li>
            <li><a data-id="axel" onClick={this.setVisible}> Axel Hultman</a></li>
            <li><a data-id="christoffer" onClick={this.setVisible}> Christoffer Möckelind</a></li>
            <li><a data-id="gusse" onClick={this.setVisible}> Gustav Fridh</a></li>
            <li><a data-id="mattsson" onClick={this.setVisible}> Gustav Mattsson</a></li>
            <li><a data-id="marcus" onClick={this.setVisible}> Marcus Hogler</a></li>
            <li><a data-id="peter" onClick={this.setVisible}> Peter Finnman</a></li>
            <li><a data-id="rasmus" onClick={this.setVisible}> Rasmus Fredrikson</a></li>
            <li><a data-id="robin" onClick={this.setVisible}> Robin Gileborg</a></li>
          </ul>
          <div>
            { Contributions.get(this.state.visible) }
          </div>
      </div>
    )
  }
}

export default Credits
