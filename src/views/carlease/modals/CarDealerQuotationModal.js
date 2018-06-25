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
      >
        <center><h2>With Dealer Quotation?</h2></center>
        <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        <br/>
        <br/>
        <center className={ 'car-grid-modal' }>
          <GenericButton
            onClick={ ()=> onUserConfirmation(false, false) }
            text={ 'No' }/>
          <GenericButton
            onClick={ ()=> onUserConfirmation(false, true) }
            text={ 'Yes' } />
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
