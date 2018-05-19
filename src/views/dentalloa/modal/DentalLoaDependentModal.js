import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

class DentalLoaDependentModal extends Component {
  constructor (props) {
    super(props)
      this.state = {
        chosenDependent : []
      }
    this.submitData = this.submitData.bind(this)
  }
  submitData ( value ) {
    this.setState({ chosenDependent : value })
    console.log(value)
  }
  render () {
  const { details, onClose, showDependentModal, isDismisable } = this.props

  return (
    <Modal
     onClose = { onClose }
     isDismisable = { true }
   >
      <div className = { 'optical-description' }>
        <h2>Dependent</h2>
      </div>
      <div className = { 'optical-modal-footer' }>
          <GenericButton
              className = { 'dentalloa-modal-option-button' }
              text = {'Me'}
              onClick = { () => this.submitData('personal') }/>
          {
            details.map((dependent, key ) =>
              <GenericButton
                  key = { key }
                  className = { 'dentalloa-modal-option-button' }
                  details = {dependent.name}
                  onClick = { () => this.submitData( dependent) }/>
            )
          }
      </div>
    </Modal>
    )
  }
}
DentalLoaDependentModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
}
DentalLoaDependentModal.defaultProps = {
}
export default DentalLoaDependentModal
