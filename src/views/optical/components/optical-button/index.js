import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './optical-button.css'

class OpticalButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { text, onClick } = this.props
    return (
      <button
        className = { 'optical-button' }
        onClick = { onClick }
      >{ text }</button>
    )
  }
}
OpticalButton.propTypes = {
  text : PropTypes.string,
  onClick : PropTypes.func,
}
OpticalButton.defaultProps ={
  text : 'submit'
}
export default OpticalButton
