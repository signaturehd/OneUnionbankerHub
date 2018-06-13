import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/dentalLoaModalStyle.css'

class DentalLoaProcedureModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chosenProcedure : [],
    }
    this.getDisabledIds = this.getDisabledIds.bind(this)
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

  if (selectedProcedure) {
    const valueArr = this.getDisabledIds().map(function(item){return item})
    if (valueArr.includes(selected.id)) {
      let isExisting
      const valueInsideArr = selectedProcedure.map(function(item){return item.id})
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

/*
  Get Chosen Procedure
*/

render () {
  const {
    details,
    onClose,
    isDismisable,
    selectedProcedure
  } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div className = { 'dentalloa-description' }>
      <h2>PROCEDURES</h2>
    </div>
    <div>
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
          onClick = { () => this.setProcedure({ ...procedure }) } />
          }
        )
        :
        <center>
          <h3>Please pick your Recipient</h3>
        </center>
      }
    </div>
  </Modal>
    )
  }
}
DentalLoaProcedureModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
  isDismisable : PropTypes.bool
}
export default DentalLoaProcedureModal
