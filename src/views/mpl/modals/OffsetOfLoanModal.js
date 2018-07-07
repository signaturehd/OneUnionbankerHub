import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplOffsetLoanModal extends Component {

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
    const valueArr = this.getDisabledIds().map(item => item)
    if (valueArr.includes(selected.id)) {
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
  const { onClose, offset, onSelect }=this.props

return (
  <Modal
    onClose={ onClose }
    isDismisable={ true }>
    <div>
      <center>
        <span className={ 'mpl-icons mpl-offset-icon' }/>
        <h2 className={ 'font-weight-normal' }>
          Offsets
        </h2>
        <h5 className={ 'font-size-14px font-weight-lighter' }>Select your offset loans</h5>
          <br/>
      </center>
    </div>
    <div>
      {
        offset && offset.map((resp, key) =>
            resp.id !== 1 &&
            resp.id !== 2 ?

              <GenericButton
                className={ 'mpl-poa-modal-button' }
                key={ key }
                text={ resp && resp.promissoryNoteNumber }
                onClick={ () => console.log(offset) }
                />
            :
            <div></div>
        )
      }
    </div>
  </Modal>
    )
  }
}
MplOffsetLoanModal.propTypes={
  onClose : PropTypes.func,
  offset : PropTypes.array,
  onSelect : PropTypes.func
}

export default MplOffsetLoanModal
