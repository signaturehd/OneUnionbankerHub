import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalReimbursementProcedureModal extends Component {
constructor (props) {
  super(props)
  this.setProcedure = this.setProcedure.bind(this)
}

getDisabledIds () {
  return [3, 4, 5, 6]
}

setProcedure (selected) {
  const {
    onClose,
    procedures,
    onSubmit,
    selectedProcedure
  } = this.props
  this.props.onClose()
  if (selectedProcedure.length !== 0) {
    const valueArr = this.getDisabledIds().map(item => item)
    if (!valueArr.includes(selected.id)) {
      let isExisting
      const valueInsideArr = selectedProcedure.map(item => item.id)
      for (const i in selectedProcedure) {
        if (valueInsideArr.includes(selected.id)) {
          isExisting = true
        } else {
          isExisting = false
        }
      }

      if (!isExisting) {
        onSubmit({ ...selected })
      }
    } else {
      onSubmit({ ...selected })
    }
  } else {
    onSubmit({ ...selected })
  }
}


render () {
  const { onClose, procedures, onSubmit, selectedProcedure } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div className = { 'dentalreimbursement-description' }>
      <h2>PROCEDURES</h2>
    </div>
    <div>
      <br/>
      {
        procedures.length !==0 ?
          procedures.map((procedure, key) => {
            let isDisabled = false
            for (const i in this.getDisabledIds()) {
              if (this.getDisabledIds()[i] === procedure.id) {
                isDisabled = true
              }
            }
            return <GenericButton
              className = { `dentalloa-modal-option-button-${!isDisabled ? 'unlimited' : ''}` }
              key = { procedure.id  }
              details = { procedure && procedure.name }
              text = { procedure && procedure.name }
              onClick = { () =>  this.setProcedure({ ...procedure }) } />
          })          :
          <center>
            <h2 className = { 'font-weight-14px' }>Please pick your Recipient</h2>
          </center>
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
