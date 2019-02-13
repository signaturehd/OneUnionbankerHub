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
      codeText,
      codeTextFunc,
      submitCodeFunc,
      cancelCodeFunc,
      id,
      continueCodeFunc,
      isPincode
    } = this.props

    console.log(isPincode)
    return (
      <Modal>
        {
          isPincode ?
        <div>
          ttest
        </div>
          :
        <div>
        <GenericInput
          value = { codeText }
          text = { 'Enter your Contribution Amount' }
          type = { 'text' }
          errorMessage = { '' }
          onChange = { (e) => codeTextFunc(e.target.value) }
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
            onClick = { () => continueCodeFunc(true) }
            />
          </center>
         </div>
        }
      </Modal>
    )
  }
}

export default PensionContributionModals
