import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'
import { format } from '../../../utils/numberUtils'

import './styles/computerModalStyle.css'

class ComputerOffsetLoanModal extends Component {

constructor (props) {
  super(props)
  this.setOffsetLoan = this.setOffsetLoan.bind(this)
}

setOffsetLoan (selected) {
  const {
    onClose,
    onSelect,
    offset,
    selectedOffsetLoan
  }=this.props

  this.props.onClose()

  if (selectedOffsetLoan) {
    const valueArr=offset.map(item => item.promissoryNoteNumber)
    if (valueArr.includes(selected.promissoryNoteNumber)) {
      let isExisting
      const valueInsideArr=selectedOffsetLoan.map(item => item.promissoryNoteNumber)
      for (const i in selectedOffsetLoan) {
        if (valueInsideArr.includes(selected.promissoryNoteNumber)) {
          isExisting=true
        } else {
          isExisting=false
        }
      }
      if (!isExisting) {
        onSelect({ ...selected })
      }
    } else {
      onSelect({ ...selected })
    }
  } else {
    onSelect({ ...selected })
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
                  text={
                    `${ resp &&
                        resp.promissoryNoteNumber ?
                        resp.promissoryNoteNumber  :
                        '' }
                        ${ resp &&
                          resp.outstandingBalance ?
                          format(resp.outstandingBalance) :
                          '' }`
                        }
                  onClick={ () =>
                    this.setOffsetLoan({ ...resp })
                  }
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
ComputerOffsetLoanModal.propTypes={
  onClose : PropTypes.func,
  offset : PropTypes.array,
  onSelect : PropTypes.func
}

export default ComputerOffsetLoanModal
