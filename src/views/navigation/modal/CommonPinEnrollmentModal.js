import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput
} from '../../../ub-components/'

import { RequiredNumberValidation } from '../../../utils/validate/'

class CommonPinEnrollmentModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uniquePIN: ''
    }
  }

  render () {
    const {
      uniquePIN
    } = this.state
    const {
      onCloseModal,
      onSubmitPinCode,
      enabledLoader,
      className
    } = this.props
    return (
      <Modal
        width = { 30 }>
        <div>
          {
            enabledLoader ?
            <center>
              <h2>Please wait while we validate your PIN.</h2>
              <CircularLoader show = { true }/>
            </center>
            :
            <center>
              <div className = { 'grid-global-row' }>
                <span className = { 'lock-icon lock-icon-settings' }/>
                <div>
                  <h2 className = { 'font-size-14px' }>Hi UnionBanker!</h2>
                  <br/>
                  <h2>We&#96;re enhancing your security by installing a 5-digit code. This will also serve as your electronic signature for 1UHub. Please be reminded that this PIN code is unique to you and is only registered once.</h2>
                </div>
              </div>
              <br/>
              <GenericInput
                className = { 'generic-pin' }
                hint = { '* * * * *' }
                maxLength = { 5 }
                type = { 'password' }
                onChange = { (e) => {
                  new RequiredNumberValidation().isValid(e.target.value) ?
                  this.setState({ uniquePIN : e.target.value }) :
                  this.setState({ uniquePIN : '' })
                  }
                }
                value = { uniquePIN }
                errorMessage = { 'Please enter your 5-digit PIN' }
                />
              <br/>
              <GenericButton
                onClick = { () => onSubmitPinCode(uniquePIN) }
                text = { 'Continue' }
                />
            </center>
          }
        </div>
      </Modal>
    )
  }
}

CommonPinEnrollmentModal.propTypes = {
  enabledLoader  : PropTypes.bool,
  onCloseModal  : PropTypes.func,
}

export default CommonPinEnrollmentModal
