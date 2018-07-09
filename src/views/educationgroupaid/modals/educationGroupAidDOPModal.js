import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'
import './styles/educationGroupAidModalStyle.css'

class educationGroupAidDOPModal extends Component {
  constructor (props) {
    super(props)
  }

/*
  Get Dependent Data, display procedures
*/
  sendDOP (dop) {
    this.props.chosenDOP(dop, false)
    this.props.onClose()
  }

  render () {
  const { details, onClose, isDismisable } = this.props
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
        details.durationOfPremium &&
        details.durationOfPremium.map((durationOfPremium, key) =>
          <GenericButton
            key = { key }
            className = { 'education-modal-option-button-' }
            text = { durationOfPremium.paymentDuration }
            onClick = { () =>
              this.sendDOP(durationOfPremium)
            }
          />
        )
      }
    </div>
  </Modal>
    )
  }
}
educationGroupAidDOPModal.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  details : PropTypes.object,
}
export default educationGroupAidDOPModal
