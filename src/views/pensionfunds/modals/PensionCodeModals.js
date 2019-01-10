import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton } from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

class PensionCodeModals extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      codeText,
      codeTextFunc,
      submitCodeFunc
    } = this.props

    return (
      <Modal>
        <GenericInput
          value = { codeText }
          text = { 'Enter your Four digit activation code' }
          type = { 'text' }
          onChange = { (e) => codeTextFunc(e.target.value) }
          />
        <center>
          <GenericButton
            text = { 'Submit' }
            onClick = { () => submitCodeFunc() }
            />
        </center>
      </Modal>
    )
  }
}

export default PensionCodeModals
