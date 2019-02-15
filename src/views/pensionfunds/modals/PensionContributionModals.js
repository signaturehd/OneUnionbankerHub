import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton, Modal, SliderComponent } from '../../../ub-components/'

import '../styles/fundsStyle.css'

class PensionContributionModals extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      amountText,
      amountTextFunc,
      submitCodeFunc,
      cancelCodeFunc,
      continueCodeFunc,
    } = this.props

    return (
      <Modal>
        <div>
          <div className = { 'font-size-10px unionbank-color-grey' }>
            Slide Contribution Amount
          </div>
          <br/>
          <SliderComponent
            onChangeValue = { (amount) => amountTextFunc(amount) }
            min = { 5000 }
            max = { 50000 }
          />
        </div>
        <br/>
        <center className = { 'grid-global' }>
          <GenericButton
            className = { 'profile-button-small' }
            text = { 'Cancel' }
            onClick = { () => cancelCodeFunc() }
            />
          <GenericButton
            className = { 'profile-button-small' }
            text = { 'Continue' }
            onClick = { () => continueCodeFunc() }
            />
        </center>
      </Modal>
    )
  }
}

export default PensionContributionModals
