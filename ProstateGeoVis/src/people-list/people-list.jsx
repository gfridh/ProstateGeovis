import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class PeopleList extends Component {
  constructor(props) {
    super(props)
    this.state = { people: this.props.people, filtered: this.props.people }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.people != this.props.people) {
      this.setState({ people: newProps.people })
      console.log("HOLD UP", newProps.people.length)
      return
    }

    let filtered = this.state.people
    if (!newProps.filters) { return }
    if (newProps.filters.municipality) {
      filtered = filtered.filter((person) => {
        return person.municipality == newProps.filters.municipality
      })
    }
    const now = moment(Date.now())

    if (newProps.filters.age.min) {
      filtered = filtered.filter((person) => {
        return now.diff(moment(person.birth_date), 'years') >= newProps.filters.age.min
      })
    }
    if (newProps.filters.age.max) {
      filtered = filtered.filter((person) => {
        return now.diff(moment(person.birth_date), 'years') <= newProps.filters.age.max
      })
    }
    this.setState({ filtered: filtered })
  }

  render() {
    return (
      <div>
        <h3>List of patients</h3>
        <h5>{this.state.people.length}</h5>
        <ul>
          {
            this.state.people.slice(0, 10)
            .map(person => {
              return (
                <li key={person.psa_sample_id_new}>
                  {person.psa_total}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

PeopleList.propTypes = {
  people: React.PropTypes.array.isRequired,
  filters: React.PropTypes.object

}

export default PeopleList
