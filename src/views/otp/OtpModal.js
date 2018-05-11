
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
    }
  }

  onOtpSuccess () {
    // TODO redirect to login
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
          <GenericButton text= "Submit" onClick={ () => this.presenter.verifyOtp(username, otp, transactionType) } />
          <GenericButton text= "Resend OTP" onClick={ () => this.presenter.resendOtp(username, transactionType) } />
      </Modal>
      )
  }
}
// TODO setup props that is required

export default ConnectPartial(OtpModal, Presenter)