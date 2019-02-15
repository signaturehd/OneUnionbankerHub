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
          <center className = { 'unionbank-color font-size-16px' }>{amountText}</center>
          <SliderComponent
            onChangeValue = { (amount) => {
              amountTextFunc(amount)} }
            min = { 5000 }
            text = { 'Slide Contribution Amount' }
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
