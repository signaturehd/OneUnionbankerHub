import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class MPLPurposeOfAvailmentModal extends Component {
render () {
  const { onClose, purposeOfAvailment, onSubmit } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div className = { 'dentalreimbursement-description' }>
      <h2>Purpose Of Availment</h2>
    </div>
    <div>
      {
        purposeOfAvailment && purposeOfAvailment.map((resp, key) =>
        <GenericButton
            className = { 'dentalloa-modal-option-button' }
            key = { key }
            details = { resp && resp.name }
            text = { resp && resp.name }
            onClick = { () => onSubmit({ ...resp }) }/>
          )
        }
    </div>
  </Modal>
    )
  }
}
MPLPurposeOfAvailmentModal.propTypes = {
  onClose : PropTypes.func,
  purposeOfAvailment : PropTypes.array,
  onSubmit: PropTypes.func,
}

export default MPLPurposeOfAvailmentModal
