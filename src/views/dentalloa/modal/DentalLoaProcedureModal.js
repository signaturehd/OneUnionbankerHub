import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalLoaProcedureModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
    chosenProcedure : [],
  }
this.submitData = this.submitData.bind(this)
this.getDisabledIds = this.getDisabledIds.bind(this)
}

getDisabledIds () {
  return [3, 4, 5, 6]
}

/*
  Get Chosen Procedure
*/
submitData (value1, key) {
  this.props.onSubmit(value1)
  this.props.onClose()
}

render () {
  const {
    details,
    detailsId,
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
      details.map((procedure, key) => {
        let isDisabled = false
        for (const i in this.getDisabledIds()) {
          if (this.getDisabledIds()[i] === procedure.id) {
            isDisabled = true
          }
        }

      return <GenericButton
        className = { `dentalloa-modal-option-button-${!isDisabled ? 'unlimited' : ''}` }
        key = { procedure.id  }
        details = { procedure }
        text = { procedure.name }
        onClick = { () => this.submitData({...procedure}, procedure.id) } />
      })
      :
      <center><h3>Please pick your Recipient</h3></center>
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
