import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalReimbursementProcedureModal extends Component {
  constructor (props) {
    super(props)
      this.state = {
        showResults : []
      }
    this.submitData = this.submitData.bind(this)
  }
submitData (procedureName, procedureAmount) {
    this.props.showResults(procedureName, procedureAmount)
    this.props.onClose()
    console.log(procedureName)
  }

  render () {
    const { details, onClose, proceedModal, isDismisable } = this.props
    const { showResults } = this.state
return (
  <Modal
    onClose = { onClose }
    isDismisable = { true } 
    showResults = { showResults } >
    <div className = { 'optical-description' }>
      <h2>Procedures</h2>
    </div>
    <div>
      {
        details.map((procedure, key) =>
        <GenericButton
            className = { 'dentalloa-modal-option-button' }
            key = { key }
            details = {procedure && procedure.name}
            text = { procedure && procedure.name}
            onClick = { () => this.submitData(procedure.name, procedure.amount)}/>
          )
        }
    </div>
  </Modal>
  )
  }
}
DentalReimbursementProcedureModal.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  proceedModal : PropTypes.func,
  details : PropTypes.array,
}
DentalReimbursementProcedureModal.defaultProps = {

}
export default DentalReimbursementProcedureModal
