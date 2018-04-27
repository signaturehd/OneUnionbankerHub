import React, { Component } from 'react'
import './optical-textbox.css'
import PropTypes from 'prop-types'

class OpticalTextBox extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { placeholder, onChange, type, maxLength } = this.props

    return (
      <div className = {'container'}>
        <div className ="group">
          <input
            type = { type }
            className = { 'text' }
            onChange = { onChange }
            maxLength = { maxLength }
            required
          />
          <span className = { 'text-label' }>{ placeholder }</span>
          <span className ={ 'bar' }></span>
        </div>
      </div>
    )
  }
}
OpticalTextBox.propTypes = {
  placelholder : PropTypes.string,
  onChange : PropTypes.func,
  maxLength : PropTypes.number,
  type : PropTypes.string
}

OpticalTextBox.defaultProps = {
  placeholder : 'Upload File',
  type : 'text',
  maxLength : 100
}

export default OpticalTextBox
