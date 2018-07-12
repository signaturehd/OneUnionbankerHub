import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'
import './styles/educationGroupAidModalStyle.css'

class EducationGroupAidDependentModal extends Component {
  constructor (props) {
    super(props)
  }

/*
  Get Dependent Data, display procedures
*/
  sendDependents (dependent) {
    this.props.chosenDependent(dependent, false)
    this.props.onClose()
  }

  render () {
  const { details, onClose, showDependentModal, isDismisable } = this.props
  return (
    <Modal
     onClose = { onClose }
     isDismisable = { true }
    >
      <div className = { 'education-description' }>
        <h2 className = { 'header-default-margin' }>DEPENDENT</h2>
      </div>
      <div className = { 'optical-modal-footer' }>
      {
        details.recipients &&
        details.recipients.map((recipients, key) =>
          <GenericButton
            key = { key }
            className = { 'education-modal-option-button-' }
            text = { recipients.name }
            onClick = { () =>
              this.sendDependents(recipients)
            }
          />
        )
      }
    </div>
  </Modal>
    )
  }
}
EducationGroupAidDependentModal.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  details : PropTypes.object,
}
export default EducationGroupAidDependentModal
