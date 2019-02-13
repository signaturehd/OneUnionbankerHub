import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton, Modal } from '../../../ub-components/'

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
        <GenericInput
          value = { amountText }
          text = { 'Enter your Contribution Amount' }
          type = { 'text' }
          errorMessage = { '' }
          onChange = { (e) => amountTextFunc(e.target.value) }
          />
        <br/>
        <center>
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
