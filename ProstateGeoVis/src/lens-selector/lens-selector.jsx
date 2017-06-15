import React, { Component } from 'react'

import './lens-selector.css'


class LensSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lens: ''
    }

    this.setLens = this.setLens.bind(this)
  }

  setLens(event) {
    this.setState({ lens: event.currentTarget.dataset.id }, () => {
      this.props.handleLensChange(this.state.lens)
    })
  }

  render() {
    return (
      <div className="row top-spacer lens-selector">
        <div className="col-sm-12">
          <div className="row da-big-row">
            <div className="da-big-clicker" onClick={this.setLens} data-id="pre_lens">
              <div className="col-sm-8">
                <h1 className="preview-label">Screening</h1>
                <h4 className="preview-sub-label">Who gets tested?</h4>
              </div>
              <div className="col-sm-3">
                <img src={process.env.PUBLIC_URL + '/btn1.svg'} className="preview-button" ></img>
              </div>
            </div>
          </div>
          <div className="row da-big-row">
            <div className="da-big-clicker" onClick={this.setLens} data-id="sankey">
              <div className="col-sm-8">
                <h1 className="preview-label">Lost in transit</h1>
                <h4 className="preview-sub-label">When do people drop out of treatment?</h4>
              </div>
              <div className="col-sm-3">
                <img src={process.env.PUBLIC_URL + '/btn3.svg'} className="preview-button" ></img>
              </div>
            </div>
          </div>
          <div className="row da-big-row">
            <div className="da-big-clicker" onClick={this.setLens} data-id="death">
              <div className="col-sm-8">
                <h1 className="preview-label">Who dies?</h1>
                <h4 className="preview-sub-label">Socio-economic factors vs mortality rates</h4>
              </div>
              <div className="col-sm-3">
                <img src={process.env.PUBLIC_URL + '/btn2.svg'} className="preview-button" ></img>
              </div>
            </div>
          </div>
          <div className="da-big-clicker" onClick={this.setLens} data-id="credits">
            <p>Credits & individual contributions</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LensSelector
