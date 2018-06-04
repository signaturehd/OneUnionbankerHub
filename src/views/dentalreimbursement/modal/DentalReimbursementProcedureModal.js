import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalReimbursementProcedureModal extends Component {

render () {
  const { onClose, procedures, onSubmit } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div className = { 'dentalreimbursement-description' }>
      <h2>PROCEDURES</h2>
    </div>
    <div>
      {
        procedures && procedures.map((procedure, key) =>
        <GenericButton
            className = { 'dentalloa-modal-option-button' }
            key = { key }
            details = { procedure && procedure.name }
            text = { procedure && procedure.name }
            onClick = { () => onSubmit({ ...procedure }) }/>
          )
        }
    </div>
  </Modal>
  )
  }
}
DentalReimbursementProcedureModal.propTypes = {
  onClose : PropTypes.func,
  procedures : PropTypes.array,
  onSubmit: PropTypes.func,
}

export default DentalReimbursementProcedureModal
