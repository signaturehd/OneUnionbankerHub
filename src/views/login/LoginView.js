import React, { Component } from 'react'
import ConnectView from '../../utils/ConnectView'

import LoginPresenter from './presenter/LoginPresenter'

import BaseMVPView from '../common/base/BaseMVPView'

import { GenericButton } from '../../ub-components/UButton/'
import { GenericTextBox } from '../../ub-components/TextBox/'

import './presenter/login.css'

import OtpModal from '../otp/OtpModal'

class LoginView extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      showOtpModal: false,
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
  }

  onLoginSuccess () {
    this.setState({ showOtpModal: true })
  }

  render () {
    const { showOtpModal, username } = this.state

    return (
      <div>
        { super.render() }
        {
          //TODO properly show otp modal as 'modal', not by just swapping views lol
          showOtpModal ?
          <OtpModal
            parent = { this }
            username = { username }
            transactionType = { 2 } /> //TODO, move this static '2' to proper file on domain
          :
          <div>
            <div className = { '_login-grid' }>
              <div className = { '_benefit-frame' }>
                <div className = { '_banner-logo' }></div>
              </div>
              <div className = { '._login-form-grid' }>
                <div className = {'_image-logo'}></div>
                <GenericTextBox
                  onChange = { e => this.setState({ username: e.target.value }) }
                  placeholder = { 'Employee Id' }
                  type = { 'text' }/>
                <GenericTextBox
                  onChange = { e => this.setState({ password: e.target.value }) }
                  placeholder = { 'Password' }
                  type = { 'password' }/>
                <br/>
                <GenericButton text="Login"
                  onClick = { () => this.presenter.login(this.state.username, this.state.password) }/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectView(LoginView, LoginPresenter)
