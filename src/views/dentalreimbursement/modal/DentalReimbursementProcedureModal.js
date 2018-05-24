import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton} from '../../../ub-components/'

class DentalReimbursementProcedureModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
       showResults : []
    }
}
submitData (showResults) {
  console.log(showResults)
}
render () {
  const { details, onClose, proceedModal, isDismisable } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true } >
    <div className = { 'optical-description' }>
      <h2>Procedures</h2>
    </div>
    <div>
      {
        details.map((procedure, key ) =>
        <GenericButton
            className = { 'dentalloa-modal-option-button' }
            key = { key }
            details = {proecedure && procedure.name}
            text = { procedure && procedure.name}
            onClick = { () => this.submitData( procedure )}/>
          )
        }
    </div>
  </Modal>
  )
  }
}
DentalReimbursementProcedureModal.propTypes = {
  onClose : PropTypes.func,
  proceedModal : PropTypes.func,
}

export default DentalReimbursementProcedureModal
