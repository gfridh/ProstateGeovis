import React, { Component } from 'react'
import './footer.css'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <footer>
        Made with
        <span style={{'fontFamily': 'Helvetica'}}> &hearts; </span>
        by
        Aron Strandberg /
        Axel Hultman /
        Christoffer Möckelind /
        Gustav Fridh /
        Gustav Mattsson /
        Marcus Hogler /
        Peter Finnman /
        Rasmus Fredrikson /
        Robin Gileborg
      </footer>
    )
  }
}

export default Footer
