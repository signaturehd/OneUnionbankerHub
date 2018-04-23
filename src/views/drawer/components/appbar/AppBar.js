import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class AppBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const containerClass = 'container'
    return (
      <div className = { containerClass }>
        <div className={'header'}>
          <div className = {'icon-header'}>
            <img
              src={ require('../../../../images/logo.png') }
              className= {'_img-ub-logo'}/>
          </div>
        </div>
    </div>
    )
  }
}

export { AppBar }
