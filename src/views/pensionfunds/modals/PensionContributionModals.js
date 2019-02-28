import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton, Modal, SliderComponent } from '../../../ub-components/'

import '../styles/fundsStyle.css'

import { format } from '../../../utils/numberUtils'

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
      isBool,
    } = this.props

    return (
      <Modal>
        <div>
          <center className = { 'unionbank-color font-size-16px' }>{format(amountText ? amountText : 0)}</center>
          <SliderComponent
            onChangeValue = { (amount) => {
              amountTextFunc(amount)} }
            min = { 100 }
            text = { 'Slide Contribution Amount' }
            max = { 5000 }
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
            text = { `${ isBool === false || isBool === null ? 'Update' : 'Continue' }` }
            onClick = { () => {
              continueCodeFunc()
            } }
            />
        </center>
      </Modal>
    )
  }
}

export default PensionContributionModals
