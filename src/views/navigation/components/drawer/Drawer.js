import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/drawer.css'

class Drawer extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
      <div className = { '_main-content' }>
          {
            this.props.children
          }
      </div>
    )
  }
}
export default Drawer
