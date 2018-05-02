import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

import  GenericButton  from  '../../../ub-components/UButton/GenericButton'

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
      <GenericButton
        text = { text }
        className = { 'optical-button' }
        onClick = { this.proceedModal }>
      </GenericButton>
    )
  }
}

OpticalButton.propTypes = {
  text : PropTypes.string,
  onClick : PropTypes.func,
  proceedModal : PropTypes.func,
}
OpticalButton.defaultProps ={
  text : 'Submit',
}
export default OpticalButton
