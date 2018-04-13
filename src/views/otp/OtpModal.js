import React, { Component } from 'react'
import ConnectPartial from '../../utils/ConnectPartial'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OtpPresenter'

class OtpModal extends BaseMVPView {

  constructor (props) {
    super(props);

    this.state = {
      otp: '',
    }
  }

  onOtpSuccess () {
    //TODO redirect to login
    console.log('otp success')
  }

  render () {
    const { transactionType, username } = this.props;
    const { otp } = this.state;
    return (
      <div>
        <input onChange={ e => this.setState({ otp: e.target.value }) } text='OTP' />
        <button onClick={ () => this.presenter.verifyOtp(username, otp, transactionType) }>Submit</button>
      </div>
    )
  }
}

//TODO setup props that is required

export default ConnectPartial(OtpModal, Presenter)
