import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

class DentalLoaDependentModal extends Component {
  constructor (props) {
    super(props)
  }

/*
  Get Dependent Data, display procedures
*/
  sendDependents (recipient, recipientText, procedure) {
    this.props.chosenDependent(recipient, recipientText, false)
    this.props.dependentProcedure(procedure)
    this.props.onClose()
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
      {
        details.dependents &&
        details.dependents.map((dependent, key) =>
          <GenericButton
            key = { key }
              className = { 'dentalloa-modal-option-button' }
              text = { dependent.name }
              onClick = { () => this.sendDependents(dependent, dependent.name, dependent.procedures) }
            />
        )
      }
      {
        details.dependent &&
        details.dependent.map((dependent, key) =>
          <GenericButton
              key = { key }
              className = { 'dentalloa-modal-option-button' }
              details = { dependent.name }
              onClick = { () =>  (onClick(dependent, dependent.name, details.procedures), onClose) }
          />
        )
      }
    </div>
  </Modal>
    )
  }
}
DentalLoaDependentModal.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  details : PropTypes.object,
}
export default DentalLoaDependentModal
