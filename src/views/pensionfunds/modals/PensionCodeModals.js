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
          text = { 'Enter your Four digit activation code' }
          type = { 'text' }
          errorMessage = { '' }
          onChange = { (e) => codeTextFunc(e.target.value) }
          />
        <h4 className={ 'font-weight-lighter text-align-center font-size-10px' }>We have sent an SMS including activation code to +63XXXXXXXX</h4>
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

export default PensionCodeModals
