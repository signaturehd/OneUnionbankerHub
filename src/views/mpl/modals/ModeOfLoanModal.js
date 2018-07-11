import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplModeOfLoanModal extends Component {
render () {
  const { onClose, offset, onSubmit }=this.props

return (
  <Modal
    onClose={ onClose }
    isDismisable={ true }>
    <div>
      <center>
        <span className={ 'mpl-icons mpl-mode-icon' }/>
        <h2 className={ 'font-weight-normal' }>
          Mode of Loan
        </h2>
        <h5 className={ 'font-size-14px font-weight-lighter' }>Choose your desired mode of loan</h5>
          <br/>
      </center>
    </div>
    <div>
      {
        offset && offset.map((resp, key) =>
          resp.id === 1 ||
          resp.id === 2 ?
          <GenericButton
            className={ 'mpl-poa-modal-button' }
            key={ key }
            text={ resp && resp.name }
            onClick={ () => onSubmit(resp, resp.id === 2 ? true : false, false) }/>
          :
          <div ket={ key }></div>
      )
      }
    </div>
  </Modal>
    )
  }
}
MplModeOfLoanModal.propTypes={
  onClose : PropTypes.func,
  offset : PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onSubmit : PropTypes.func
}

export default MplModeOfLoanModal
