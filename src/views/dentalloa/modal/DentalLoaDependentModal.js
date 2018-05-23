import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

class DentalLoaDependentModal extends Component {
  constructor (props) {
    super(props)
  }

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

          {
            details.dependents &&
            details.dependents.map((dependent, key ) =>
            <GenericButton
                className = { 'dentalloa-modal-option-button' }
                text = {dependent.name}
                onClick = { () => this.sendDependents( 0, dependent.name, dependent.procedures) }
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
                  onClick = { () =>  (onClick(dependent.id, dependent.name, dependent.procedures), onClose) }
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
