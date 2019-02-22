import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton, Modal } from '../../../ub-components/'

import '../styles/fundsStyle.css'

class PensionCodeModals extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      codeText,
      codeTextFunc,
      submitCodeFunc,
      cancelCodeFunc,
    } = this.props

    return (
      <Modal>
        <GenericInput
          value = { codeText }
          text = { 'Enter your five digit activation code' }
          type = { 'password' }
          maxLength = { 5 }
          errorMessage = { '' }
          onChange = { (e) => codeTextFunc(e.target.value) }
          />
        <center className = { 'grid-global' }>
          <GenericButton
            className = { 'profile-button-small' }
            text = { 'Cancel' }
            onClick = { () => cancelCodeFunc() }
            />
          <GenericButton
            className = { 'profile-button-small' }
            text = { 'Submit' }
            onClick = { () => submitCodeFunc() }
            />
        </center>
      </Modal>
    )
  }
}

export default PensionCodeModals
