import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class OpticalButton extends Component {
  constructor (props) {
    super(props)
    this.proceedModal = this.proceedModal.bind(this)
  }

  proceedModal () {
      this.props.show()
  }

  render () {
    const { text, onClick, showModal, showConfirmation} = this.props
    return (
      <button
        className = { 'optical-button' }
        onClick = { this.proceedModal }>
        { text }
      </button>
    )
  }
}

OpticalButton.propTypes = {
  text : PropTypes.string,
  onClick : PropTypes.func,
  proceedModal : PropTypes.func,
}
OpticalButton.defaultProps ={
  text : 'continue',
}
export default OpticalButton
