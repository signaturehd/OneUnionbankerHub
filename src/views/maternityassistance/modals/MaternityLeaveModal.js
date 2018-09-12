import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

import * as Functions from '../function/MaternityAssistanceFunction'

class MaternityLeaveModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  const {
    onClose,
    isDismisable,
    onLoadMaternityLeave,
    onLoadNavigateBenefits,
    benefitsCodeType
  } = this.props
  const titleOFLeave = Functions.checkedReasonForLeave(benefitsCodeType)

  return (
    <Modal
     onClose = { onClose }
     isDismisable={ true }
    >
      <div className={ 'text-align-center' }>
        <h2> Have you filed your `${ titleOFLeave }` already?</h2>
        <br/>
        <div className = { 'grid-global' }>
          <GenericButton
            text = { 'Yes' }
            onClick = { () => onLoadNavigateBenefits() }
            />
          <GenericButton
            text = { 'No' }
            onClick = { () => onLoadMaternityLeave(true) }
            />
        </div>
      </div>
  </Modal>
    )
  }
}
MaternityLeaveModal.propTypes={
  onClose : PropTypes.func,
  onLoadMaternityLeave : PropTypes.func,
  onLoadNavigateBenefits : PropTypes.func,
  isDismisable : PropTypes.bool,
}
export default MaternityLeaveModal
