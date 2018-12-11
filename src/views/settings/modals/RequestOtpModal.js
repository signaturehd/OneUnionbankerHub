import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Modal,
  Line,
  Card,
  GenericButton,
  GenericInput,
  CircularLoader
} from '../../../ub-components/'

import { RequiredNumberValidation } from '../../../utils/validate/'

import '../modals/styles/contactModal.css'

class RequestOtpModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      showNewPin,
      showNewPinFunc,
      requiredOtpFunc,
      requiredOtp,
      requiredNewPin,
      requiredNewPinFunc,
      onClose,
      submitFunction
    }=this.props

    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          {
            showNewPin ?
            <div>
              <div className = { 'grid-global-row' }>
                <div>
                  <span className = { 'security-icon security-icon-settings' }/>
                    <br/>
                </div>
                <h2 className = { 'font-size-12px' }>You will receive a One-Time Password (OTP) on your registered mobile number</h2>
              </div>
              <br/>
              <GenericInput
                hint = "OTP"
                className = { 'center-text' }
                maxLength = {6}
                value = { requiredOtp }
                onChange={ (e) => requiredOtpFunc(e.target.value) }
                errorMessage = { 'Please enter your 6-digit code' }
              />
              <br/>
              <GenericButton
                text = { 'Continue' }
                onClick = { () =>
                  showNewPinFunc(false)
                }
               />
             <br/>
            </div>
            :
            <div>
              <div className = { 'grid-global-row' }>
                <div>
                  <span className = { 'security-icon security-icon-settings' }/>
                    <br/>
                </div>
                <h2 className = { 'font-size-12px' }>Enter your New PIN Code</h2>
              </div>
              <br/>
              <GenericInput
                hint = "New PIN Code"
                className = { 'center-text' }
                maxLength = {5}
                value = { requiredNewPin }
                onChange={ (e) => requiredNewPinFunc(e.target.value) }
                errorMessage = { 'Please enter your 5-digit code' }
              />
              <br/>
              <GenericButton
                text = { 'Continue' }
                onClick = { () =>
                  submitFunction()
                }
               />
             <br/>
            </div>
          }
        </center>
      </Modal>
    )
  }
}

RequestOtpModal.propTypes={
}

export default RequestOtpModal
