import React, { Component } from 'react'
import ConnectView from '../../utils/ConnectView'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OtpPresenter'

import {
  GenericTextBox,
  GenericButton,
  Modal,
  CircularLoader
} from '../../ub-components'

import './styles/otp.css'

class OtpModal extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      otp: '',
      disableSubmit : false,
      disableResend : false,
      text : null,
    }

    this.onResendSuccess = this.onResendSuccess.bind(this)
    this.onOtpSuccess = this.onOtpSuccess.bind(this)
  }

  onOtpSuccess (terms) {
    this.props.sendTerms(terms.accepted, terms.content)
    // TODO redirect to login
  }

  onOtpError () {
    this.setState({ disableSubmit: false })
  }

  onResendSuccess () {
    this.setState({ disableResend : false, text : '' })
  }

  render () {
    const {
      transactionType,
      username,
      onClose,
    } = this.props

    const {
      otp,
      text,
      disableSubmit,
      disableResend,
    } = this.state

    return (

      <Modal
          onClose = {onClose}
        >
        {
          disableSubmit || disableResend ?
          <center>
            <h3>{ text }</h3>
            <br/>
            <br/>
            <CircularLoader show={true}/>
          </center>          :
          <div>
            <GenericTextBox
              text= "OTP"
              placeholder = "OTP"
              type = ""
              className = {'center-text'}
              maxLength = {6}
              onChange={ e => this.setState({ otp: e.target.value }) }
            />
            <br/>
            <br/>
            <div className = {'otp-function'}>
              <GenericButton text= "Submit"
                onClick={ () => {
                    this.presenter.verifyOtp(username, otp, transactionType),
                    this.setState({ disableSubmit : true, text : 'Please wait while were verifying your OTP' })
                  }
                }
                disabled = {this.state.disableSubmit}
               />
              <GenericButton text= "Resend OTP"
                onClick={ () => {
                    this.presenter.resendOtp(username, transactionType),
                    this.setState({ disableResend: true, text : 'Please wait while were resending your OTP' })
                  }
                }
                disabled = {this.state.disableResend}
              />
            </div>

            <br/>
            <br/>
            </div>
        }

      </Modal>
      )
  }
}
// TODO setup props that is required

export default ConnectView(OtpModal, Presenter)
