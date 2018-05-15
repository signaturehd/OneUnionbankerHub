import React, { Component } from 'react'
import ConnectView from '../../utils/ConnectView'

import LoginPresenter from './presenter/LoginPresenter'

import BaseMVPView from '../common/base/BaseMVPView'

import { GenericButton, GenericTextBox, Card } from '../../ub-components'

import './css/login.css'

import OtpModal from '../otp/OtpModal'

class LoginView extends BaseMVPView {
  constructor (props) {
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
          // TODO properly show otp modal as 'modal', not by just swapping views lol
          showOtpModal &&
          <OtpModal
            show = { this.state.showOtpModal }
            onClose = { () => this.setState({ showOtpModal : false }) }
            parent = { this }
            username = { username }
            transactionType = { 2 } /> // TODO, move this static '2' to proper file on domain
        }
        <Card className = {'login-form'}>
          <img className = { 'login-logo' } src = { require('../../images/profile-picture.png')} />
            <GenericTextBox
              clasName = { 'login-input' }
              onChange = { e => this.setState({ username: e.target.value }) }
              placeholder = { 'Employee ID' }
              type = { 'text' }/>
            <GenericTextBox
              className = { 'login-input' }
              onChange = { e => this.setState({ password: e.target.value }) }
              placeholder = { 'Password' }
              type = { 'password' }/>
            <GenericButton
              disabled = {this.state.disabled}
              className = { 'login-button' }
              text="Login"
              onClick = { () => this.presenter.login(this.state.username, this.state.password)}/>
            <div className = { 'login-layer-icons' }>
                  <img
                    src = { require('../../images/icons/PAGIBIG.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/PHIC.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/sssOrange.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/PremiumBadgeOrange.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/RankOrange.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/taxOrange.png') }
                    className = { 'icon-1' } />
                  <img
                    src = { require('../../images/icons/DesignationOrange.png') }
                    className = { 'icon-1' } />
            </div>
        </Card>
      </div>
    )
  }
}

export default ConnectView(LoginView, LoginPresenter)
