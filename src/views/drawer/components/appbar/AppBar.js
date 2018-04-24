import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './styles/appbar.css'

class AppBar extends Component {
  constructor (props) {
    super(props)
  }
  onToggleShow() {
      this.setState ( { displayShow : 'block' } )
  }
  render () {
    const containerClass = 'container'
    const { onClick, displayNavIcon, onToggleShow, displayShow} = this.props
    const style = {
      show: {
        display : displayNavIcon
      }
    }
    return (
      <div className = { containerClass }>
        <div className={'header'}>
          <div className = {'icon-header'}>
            <img
              src={ require('../../../../images/logo.png') }
              className= {'_img-ub-logo'}/>
          </div>
          <div className = { 'burger-icon' }>
            <img
              style = { style.show }
              src = { require('../../../../images/profile-picture.png')}
              className = {'_img-ub-profile burger-icon'}
              onClick = { this.onToggleShow }/ >
          </div>
        </div>
    </div>
    )
  }
}

export { AppBar }
