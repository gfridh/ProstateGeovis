import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { filterByPSA } from 'services/psa'

import PeopleList from 'people-list/people-list.jsx'


class LostInTransit extends Component {
  constructor(props) {
    super(props)
    // this.state = { people: this.props.people, filtered: this.props.people }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = {
      people: []
    }
    // filterByPSA({ max: 0.2 })
    // .then(people => {
    //   console.log("filtered: ", people.length)
    //   // this.setState({ people: people })
    //   this.ppl = people
    // })
    // this.state = {
    //   people: this.ppl
    // }
    // console.log(this.state)
  }
  componentDidMount() {
    // todo move to function
    filterByPSA({ min: 20, variable: 'psa_total' })
    .then(people => {
      console.log("filtered: ", people.length)
      this.setState({ people: people })
    })
    // todo aggregate per municipality
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div>
        <h4>List of patients who received a high PSA value, but didn't get treatment</h4>
        <h5>{this.state.people.length}</h5>
        <PeopleList people={this.state.people}/>
      </div>
    )
  }
}

LostInTransit.propTypes = {}

export default LostInTransit
