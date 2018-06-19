import React, { Component } from 'react'
import ConnectView from '../../utils/ConnectView'

import LoginPresenter from './presenter/LoginPresenter'

import BaseMVPView from '../common/base/BaseMVPView'

import {
  GenericButton,
  GenericTextBox,
  Card,
  CircularLoader,
  Notify
} from '../../ub-components'

import './styles/login.css'

import OtpModal from '../otp/OtpModal'
import TermsModal from '../termsandcondition/TermsModal'

import { connect } from 'react-redux'

import store from '../../store'
import { NotifyActions } from '../../actions'

class LoginView extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      showTermsAndCondition : false,
      showOtpModal: false,
      disabled : false,
      terms : null,
      type: 'password',
    }
    this.showHide = this.showHide.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
  }
   showHide (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }

  componentDidMount () {
    store.dispatch(NotifyActions.resetNotify())
  }

  disabledButton () {
    this.setState({ disabled : true })
  }

  enabledButton () {
    this.setState({ disabled : false })
  }

  disabledButton () {
    this.setState({ disabled : true })
  }

  enabledButton () {
    this.setState({ disabled : false })
  }

  onLoginSuccess () {
    this.setState({ showOtpModal: true })
  }

  onLoginError (response) {
    this.setState({ disabled : false })
  }

  downloadIOS () {
    window.location.href = 'itms-services://?action=download-manifest&amp;url=https://oneunionbankerhub.com/download/manifest.plist'
  }

  downloadAndroid () {
    window.open('https://play.google.com/store/apps/details?id=com.unionbankph.oneunionbankerhub')
  }


  render () {
    const { showOtpModal, username, terms, showTermsAndCondition } = this.state
    const { notify } = this.props
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
            sendTerms = { (accepted, terms) => this.setState({ showTermsAndCondition : !accepted, showOtpModal : false, terms }) }
            transactionType = { 2 } /> // TODO, move this static '2' to proper file on domain
        }
        {
          showTermsAndCondition &&
          <TermsModal
            onClose = { () => this.setState({ showTermsAndCondition : false }) }
            terms = { terms }
          />
        }

        <Card className = {'login-form'}>
          <img className = { 'login-logo' } src = { require('../../images/profile-picture.png')} />
            <GenericTextBox
              autocomplete='off'
              onChange = { e => this.setState({ username: e.target.value }) }
              placeholder = { 'Employee ID' }
              type = { 'text' }/>
            <GenericTextBox
              autocomplete='off'
              onChange = { e => this.setState({ password: e.target.value }) }
              placeholder = { 'Password' }
              type = { this.state.type }
              className={ 'password__input' }/>
              <span className={'password__show'} onClick={this.showHide}>{this.state.type === 'input' ? '' : ''}</span>
              <br/>
            {
              this.state.disabled ?
              <center>
                <br/>
                <CircularLoader show = { true }/>
              </center>              :
              <div>
                <br/>
                  <GenericButton
                    disabled = {this.state.disabled}
                    className = { 'login-button' }
                    text="Login"
                    onClick = { () => this.presenter.login(this.state.username, this.state.password)}/>
                <br/>
              </div>

            }
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
            <br/>
            <div className = {'download-container'}>
              <span className = {'link-googleplay'} onClick = { () => this.downloadAndroid() } />
              <span className = {'link-appstore'} onClick = { () => this.downloadIOS() } />
            </div>
        </Card>

          <div className = { 'notify-container' }>
          {
            notify &&
            notify.map((notify, i) => (
              <Notify
                onClick = { () => {
                  store.dispatch(NotifyActions.removeNotify(i))
                }}
                key = { i }
                title = { notify.title }
                message = { notify.message }
                type = { notify.type }
              />
            ))
          }
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  notify : state.notify
})

export default ConnectView(connect(mapStateToProps)(LoginView), LoginPresenter)
