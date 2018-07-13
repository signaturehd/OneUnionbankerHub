import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/computerModalStyle.css'

class ComputerModeOfLoanModal extends Component {
render () {
  const { onClose, offset, onSubmit } = this.props

return (
  <Modal
    onClose={ onClose }
    isDismisable={ true }>
    <div>
      <center>
        <h2>
          Mode of Loan
        </h2>
      </center>
    </div>
    <div>
      {
        offset && offset.map((resp, key) =>
        <GenericButton
          className={ 'motor-modal-button' }
          key={ key ? key : '' }
          text={ resp && resp.name ? resp.name : '' }
          onClick={ () => onSubmit(resp ? resp : '', false) }/>
        )
      }
    </div>
  </Modal>
    )
  }
}
ComputerModeOfLoanModal.propTypes = {
  onClose : PropTypes.func,
  offset : PropTypes.array,
  onSubmit : PropTypes.func
}

export default ComputerModeOfLoanModal
