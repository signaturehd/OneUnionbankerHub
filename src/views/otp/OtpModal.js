
import React, { Component } from 'react'
import ConnectPartial from '../../utils/ConnectPartial'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OtpPresenter'

import { GenericTextBox, GenericButton, Modal, CircularLoader } from '../../ub-components'

class OtpModal extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      otp: '',
      disableSubmit : false,
      disableResend : false,
      text : null
    }

    this.onResendSuccess = this.onResendSuccess.bind(this)
  }

  onOtpSuccess () {
    // TODO redirect to login
  }

  onOtpError () {
    this.setState({disableSubmit: false})
  }

  onResendSuccess () {
    this.setState({ disabledResend : false, text : '' })
  }

  render () {
    const { transactionType, username, onClose } = this.props
    const { otp, text, disableSubmit, disableResend } = this.state
    const styles = {
      centerOpt : {
        textAlign: 'center',
      }
    }
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
          <div style = { styles.centerOpt }>
            <GenericTextBox
            text= "OTP"
              placeholder = "OTP"
              type = ""
              onChange={ e => this.setState({ otp: e.target.value }) }
            />
            <br/>
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
        }

      </Modal>
      )
  }
}
// TODO setup props that is required

export default ConnectPartial(OtpModal, Presenter)