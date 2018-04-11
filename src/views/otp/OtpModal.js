import React, { Component } from 'react'
import ConnectPartial from '../../utils/ConnectPartial'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OtpPresenter'

import { GenericTextBox } from '../../ub-components/TextBox/'
import { GenericButton } from '../../ub-components/UButton/'
import { Modal } from '../../ub-components/Modal/'

class OtpModal extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state = {
      otp: '',
    }
  }

  onOtpSuccess () {
    //TODO redirect to login
    console.log('otp success')
  }

  render () {
    const { transactionType, username, onClose } = this.props
    const { otp } = this.state
    console.log(onClose)
    return (

      <Modal
          onClose = {onClose}
        >
        <GenericTextBox text= "OTP"
          placeholder = "OTP"
          type = ""
          onChange={ e => this.setState({ otp: e.target.value }) }  />
        <GenericButton text= "Submit" onClick={ () => this.presenter.verifyOtp(username, otp, transactionType) } />
      </Modal>
      )
  }
}
//TODO setup props that is required

export default ConnectPartial(OtpModal, Presenter)
