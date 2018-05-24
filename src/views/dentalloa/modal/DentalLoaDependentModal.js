import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

class DentalLoaDependentModal extends Component {
  constructor (props) {
    super(props)
  }

/*
  Get Dependent Data
*/
  sendDependents (receipientId, receipientText, procedure) {
    this.props.chosenDependent(receipientId, receipientText, procedure, false)
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
          <GenericButton
              className = { 'dentalloa-modal-option-button' }
              text = { 'Me' }
              onClick = { () => this.sendDependents( 0, 'Personal', details.procedures) }
          />
          {
            details.dependents &&
            details.dependents.map((dependent, key ) =>
            <GenericButton
              key = { key }
                className = { 'dentalloa-modal-option-button' }
                text = { dependent.name }
                onClick = { () => this.sendDependents( dependent.id, dependent.name, details.procedures) }
            />
            )
          }
          {
            details.dependent &&
            details.dependent.map((dependent, key ) =>
              <GenericButton
                  key = { key }
                  className = { 'dentalloa-modal-option-button' }
                  details = {dependent.name}
                  onClick = { () =>  (onClick( dependent.id, dependent.name, details.procedures ), onClose) }
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
  details : PropTypes.array,
}
DentalLoaDependentModal.defaultProps = {
}
export default DentalLoaDependentModal
