import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalLoaProcedureModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
    chosenProcedure : [],
    status : false
  }
this.submitData = this.submitData.bind(this)
}

/*
  Get Chosen Procedure
*/
submitData (value1, data) {
  this.setState({ status : data })
  this.props.chosenProcedure( value1)
  this.props.onClose()
}

render () {
  const {
    details,
    onClose,
    text,
    isDismisable,
    status } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>

    <div className = { 'optical-description' }>
      <h2>Procedures</h2>
    </div>
    <div className = { 'optical-modal-footer' }>
    {
      details ?
        details.map((procedure, key) =>
          procedure.id !== 3 &&
          procedure.id !== 4 &&
          procedure.id !== 5 &&
          procedure.id !== 6 ?
            <GenericButton
              className = { 'dentalloa-modal-option-button' }
              key = { key }
              disabled = { status }
              details = { procedure }
              text = { procedure.name }
              onClick = { () => this.submitData(procedure, true)}/>
            :
            <GenericButton
              className = { 'dentalloa-modal-option-button-unlimited' }
              key = { key }
              text = { procedure.name }
              onClick = { () => this.submitData(procedure) }/>
          )
        :
        <center><h3>Please pick your Receipient</h3></center>
      }
      </div>
    </Modal>
    )
  }
}
DentalLoaProcedureModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
}
export default DentalLoaProcedureModal
