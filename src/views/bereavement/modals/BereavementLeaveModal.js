import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'
import './styles/bereavementModal.css'

class BereavementLeaveModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  const {
    onClose,
    isDismisable,
    onLoadBereavementLeave,
    onLoadNavigateBenefits,
  } = this.props

  return (
    <Modal
     onClose = { onClose }
     isDismisable={ true }
    >
      <div className={ 'text-align-center' }>
        <h2>  Have you file your bereavement leave already ? </h2>
        <br/>
        <div className = { 'grid-global' }>
          <GenericButton
            text = { 'Yes' }
            onClick = { () => onLoadNavigateBenefits() }
            />
          <GenericButton
            text = { 'No' }
            onClick = { () => onLoadBereavementLeave(true) }
            />
        </div>
      </div>
  </Modal>
    )
  }
}
BereavementLeaveModal.propTypes={
  onClose : PropTypes.func,
  onLoadBereavementLeave : PropTypes.func,
  onLoadNavigateBenefits : PropTypes.func,
  isDismisable : PropTypes.bool,
}
export default BereavementLeaveModal