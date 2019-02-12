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
      id
    } = this.props

    return (
      <Modal>
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
            text = { 'Submit' }
            onClick = { () => submitCodeFunc() }
            />
            <GenericButton
              className = { 'profile-button-small' }
              text = { 'Cancel' }
              onClick = { () => cancelCodeFunc() }
              />
        </center>
      </Modal>
    )
  }
}

export default PensionContributionModals
