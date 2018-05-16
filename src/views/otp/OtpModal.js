
import React, { Component } from 'react'
import ConnectPartial from '../../utils/ConnectPartial'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OtpPresenter'

import { GenericTextBox, GenericButton, Modal } from '../../ub-components'

class OtpModal extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      otp: '',
      disableSubmit : false,
      disableResend : false
    }

    this.onResendSuccess = this.onResendSuccess.bind(this)
  }

  onOtpSuccess () {
    // TODO redirect to login
  }

  onResendSuccess () {
    this.setState({ disabledResend : false })
  }

  render () {
    const { transactionType, username, onClose } = this.props
    const { otp } = this.state
    return (

      <Modal
          onClose = {onClose}
        >
        { super.render() }
        <GenericTextBox text= "OTP"
          placeholder = "OTP"
          type = ""
          onChange={ e => this.setState({ otp: e.target.value }) }  />
          <br/>
          <GenericButton text= "Submit"
            onClick={ () => {
this.presenter.verifyOtp(username, otp, transactionType), this.setState({ disabled : true })
} }
            disabled = {this.state.disableSubmit}
           />
          <GenericButton text= "Resend OTP"
            onClick={ () => {
this.presenter.resendOtp(username, transactionType), this.setState({ disableResend: true })
} }
            disabled = {this.state.disableResend}
          />
      </Modal>
      )
  }
}
// TODO setup props that is required

export default ConnectPartial(OtpModal, Presenter)