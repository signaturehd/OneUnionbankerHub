import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/ResetPasswordPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  GenericInput,
  GenericButton,
  Card,
  Modal,
  CircularLoader
} from '../../ub-components/'

import NoticeResponse from '../notice/NoticeResponseModal'

import './styles/reset.css'

class ResetPasswordFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      newPassword: '',
      confirmNewPassword: '',
      type : 'password',
      status : 'hide',
      type2 : 'password',
      status2 : 'hide',
      otp : '',
      showRequestOtpModal : true,
      enabledLoader : false,
      showNoticeResponseModal : false,
      showPasswordNoticeResponseModal : false,
      otpData : '',
      passwordResetLoader: false,
      confirmPasswordErrorMessage: '',
      newPasswordErrorMessage: '',
    }
    this.showHidePassword = this.showHidePassword.bind(this)
    this.showHideConfirmPassword = this.showHideConfirmPassword.bind(this)
  }

  componentDidMount () {
    const {
      token
    } = this.props.match.params
    this.setState({ token : token })
  }

  showOtpResponse (otpData, showRequestOtpModal, showNoticeResponseModal) {
    this.setState({ otpData, showRequestOtpModal, showNoticeResponseModal })
  }

  showPasswordResponse (otpData, showPasswordNoticeResponseModal) {
    this.setState({ otpData, showPasswordNoticeResponseModal })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showPasswordCircularLoader () {
    this.setState({ passwordResetLoader : true })
  }

  hidePasswordCircularLoader () {
    this.setState({ passwordResetLoader : false })
  }

  showConfirmPassErrorMessage (confirmPasswordErrorMessage) {
    this.setState({ confirmPasswordErrorMessage })
  }

  showNewassErrorMessage (newPasswordErrorMessage) {
    this.setState({ newPasswordErrorMessage })
  }

  showHidePassword (e) {
    e.preventDefault()
    e.stopPropagation()

    if(this.state.status === 'hide') {
      this.setState({
        status : 'show',
        type: this.state.type === 'input' ? 'password' : 'input'
      })
    } else if (this.state.status === 'show') {
      this.setState({
        status : 'hide',
        type: this.state.type === 'password' ? 'input' : 'password'
      })
    }
  }

  showHideConfirmPassword (e) {
    e.preventDefault()
    e.stopPropagation()

    if(this.state.status2 === 'hide') {
      this.setState({
        status2 : 'show',
        type2: this.state.type2 === 'input' ? 'password' : 'input'
      })
    } else if (this.state.status2 === 'show') {
      this.setState({
        status2 : 'hide',
        type2: this.state.type2 === 'password' ? 'input' : 'password'
      })
    }
  }

  render () {
    const {
      username,
      newPassword,
      confirmNewPassword,
      type,
      status,
      type2,
      status2,
      otp,
      showRequestOtpModal,
      enabledLoader,
      otpData,
      token,
      showNoticeResponseModal,
      showPasswordNoticeResponseModal,
      passwordResetLoader,
      newPasswordErrorMessage,
      confirmPasswordErrorMessage,
    } = this.state

    const {
      idReplace,
      history
    } = this.props

    return (
      <Card className = {'login-form'}>
        {
          showNoticeResponseModal &&
          <NoticeResponse
            noticeResponse = { otpData }
            onClose = { () =>
             this.setState({ showNoticeResponseModal : false })
            }
            />
        }
        {
          showPasswordNoticeResponseModal &&
          <NoticeResponse
            noticeResponse = { otpData }
            onClose = { () => {
              this.setState({ showPasswordNoticeResponseModal : false })
              history.push('/')
              }
            }
            />
        }
        {
          showRequestOtpModal &&
          <Modal>
            {
              enabledLoader ?
              <center>
                <br/>
                  <h2>Please wait while we we&#39;re validating the OTP</h2>
                <br/>
                  <CircularLoader show = { enabledLoader }/>
                <br/>
              </center> :
              <center>
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
                  onChange={ e => this.setState({ otp: e.target.value }) }
                  errorMessage = { 'Please enter your 6-digit code' }
                />
                <br/>
                <GenericButton
                  text = { 'Submit' }
                  onClick={ () =>
                    this.presenter.requestOtpVerification(token, otp)
                  }
                 />
              <br/>
            </center>
            }
          </Modal>
        }
        {
          passwordResetLoader ?

          <center>
            <br/><br/><br/><br/>
            <h2>Please wait while we we&#39;re updating your credentials</h2>
            <br/>
            <CircularLoader show = { passwordResetLoader }/>
            <br/>
          </center> :
          <div>
            <br/>
            <div
              className = { 'login-back-icon-grid cursor-pointer' }>
              <i
                onClick = { () => idReplace() }
                className = { 'back-arrow' }></i>
              <div></div>
            </div>
            <br/>
            <h2>Recover Password</h2>
            <br/>
            <br/>
            <GenericInput
              onChange = { e =>
                this.setState({ newPassword: e.target.value }) }
              text = { 'New Password' }
              type = { type }
              errorMessage = { newPasswordErrorMessage }
              className = { 'password__input' }/>
            <span
              className = { `password_icon password_${ status }` }
              onClick = { this.showHidePassword }>
              { type === 'input' ? '' : ''}
            </span>
            <GenericInput
              onChange = { e =>
                this.setState({ confirmNewPassword: e.target.value }) }
              text = { 'Confirm New Password' }
              type = { type2 }
              errorMessage = { confirmPasswordErrorMessage }
              className = { 'password__input' }/>
            <span
              className = { `password_icon password_${ status2 }` }
              onClick = { this.showHideConfirmPassword }>
              { type2 === 'input' ? '' : ''}
            </span>
            <br/>
            <br/>
            <center>
              <GenericButton
                text = { 'Submit' }
                onClick = { () => this.presenter.requestNewPassword(token, newPassword, confirmNewPassword, otp) }
                />
            </center>
          </div>
        }
      </Card>
    )
  }
}

export default ConnectView(ResetPasswordFragment, Presenter)
