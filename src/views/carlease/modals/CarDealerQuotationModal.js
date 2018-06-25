import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components'

class CarDealerQuotation extends Component {
  constructor (props) {
      super(props)
  }

  render () {

    const { onClose, onUserConfirmation } = this.props

    return (
      <Modal
        onClose={ onClose }
        isDismisable={ true }
      >
        <center>With Dealer Quotation?</center>
        <center>
          <GenericButton
            onClick={ ()=> onUserConfirmation(false, true) }
            text={ 'Yes' } />
          <GenericButton
            onClick={ ()=> onUserConfirmation(false, false) }
            text={ 'No' }/>
        </center>
      </Modal>
    )
  }
}

CarDealerQuotation.propTypes = {
  onClose : PropTypes.func,
  onUserConfirmation : PropTypes.func
}

export default CarDealerQuotation
