import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './styles/appbar.css'

class AppBar extends Component {
  constructor (props) {
    super(props)
    this.onToggleShow = this.onToggleShow.bind(this)
  }
  onToggleShow () {
    if (this.props.displayShow === 'none') {
      this.props.hide()
    } else if (this.props.displayShow === 'block') {
      this.props.show()
    }
  }
  render () {
    const { onClick, displayNavIcon, onToggleShow, displayShow } = this.props
    const style = {
      show: {
        display : displayNavIcon
      }
    }
    return (
        <div className={'header'}>
          <div className = {'icon-header'}>
            <img
              src={ require('../../../../images/union-logo.png') }
              className= {'_img-ub-logo'}/>
          </div>
          <div className = { 'burger-icon' }>
            <img
              style = { style.show }
              src = { require('../../../../images/profile-picture.png')}
              className = {'_img-ub-profile'}
              onClick = { this.onToggleShow }/ >
          </div>
        </div>
    )
  }
}

export { AppBar }
