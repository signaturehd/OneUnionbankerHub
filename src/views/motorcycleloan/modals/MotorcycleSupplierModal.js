import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/motorModalStyle.css'

class MotorcycleLoanSupplierModal extends Component {
render () {
  const { onClose, term, onSubmit }=this.props

return (
  <Modal
    onClose={ onClose }
    isDismisable={ true }>
    <div>
      <center>
        <h2>
          List of Supplier
        </h2>
        <h4>
        </h4>
      </center>
    </div>
    <div>
      {
        term && term.map((resp, key) =>
        <GenericButton
          className={ 'motor-modal-button' }
          key={ key }
          text={ `Term ${resp && resp.term} Rate (${resp && resp.rate}%)` }
          onClick={ () => onSubmit( resp, false ) }/>
        )
      }
    </div>
  </Modal>
    )
  }
}
MotorcycleLoanSupplierModal.propTypes={
  onClose : PropTypes.func,
  term : PropTypes.array,
  onSubmit : PropTypes.func
}

export default MotorcycleLoanSupplierModal
