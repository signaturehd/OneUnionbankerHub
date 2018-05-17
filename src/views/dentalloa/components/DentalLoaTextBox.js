import React, { Component } from 'react'
import './dentalloa-component-style.css'
import PropTypes from 'prop-types'

class DentalLoaTextBox extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {  onChange, type, onClick, placeholder } = this.props

    return (
      <div className = {'dentalloa-textbox-container'}>
        <div className = { 'group' }>
          <input className = {'text'}
            onClick = { onClick }
            type = { type }
            placeholder = { placeholder }/>
          <span className = { 'dentalloa-text-label' }></span>
          <span className ={ 'dentalloa-text-bar' }></span>
      </div>
      </div>
    )
  }
}
DentalLoaTextBox.propTypes = {
  type : PropTypes.string,
  onClick : PropTypes.func,
  placeholder : PropTypes.string,
}
DentalLoaTextBox.defaultProps = {
  type : 'button'
}
export default DentalLoaTextBox
