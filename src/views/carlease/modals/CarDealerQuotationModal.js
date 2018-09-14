import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components'

class CarDealerQuotation extends Component {

  constructor (props) {
      super(props)

  }

  navigateBenefits () {
    this.props.backToBenefits()
  }

  render () {
    const { onClose, onUserConfirmation, backToBenefits } = this.props

    return (
      <Modal>
        <br/>
          {`We're excited for you. You're a few steps away from owning your dream car. Is the dealer quotation available?`}

        <br/>
        <br/>
        <center className={ 'car-grid-modal' }>
          <GenericButton
            onClick = { () => this.navigateBenefits() }
            text = { 'No' }/>
          <GenericButton
            onClick={ () => onUserConfirmation(false, true) }
            text={ 'Yes' } />
        </center>
      </Modal>
    )
  }
}

CarDealerQuotation.propTypes = {
  onClose : PropTypes.func,
  onUserConfirmation : PropTypes.func,
  onCloseConfirmation : PropTypes.func,
  historu : PropTypes.object
}

export default CarDealerQuotation
