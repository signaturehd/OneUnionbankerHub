import React, { Component } from 'react'
import ConnectView from '../../utils/ConnectView'

import LoginPresenter from './presenter/LoginPresenter'

import BaseMVPView from '../common/base/BaseMVPView'

import { RequiredValidation } from '../../utils/validate'

import {
  GenericButton,
  Card,
  CircularLoader,
  Notify,
  GenericInput
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
      showTermsAndCondition : false,
      showOtpModal: false,
      disabled : false,
      username: '',
      password: '',
      type: 'password',
      status : 'hide',
      terms : null,
    }
    this.showHide = this.showHide.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.proceedToValidation = this.proceedToValidation.bind(this)
  }
   showHide (e) {
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
    window.open('https://play.google.com/store/apps/details?id=com.unionbankph.oneuhub')
  }

  proceedToValidation (user, pass) {
    if(!new RequiredValidation().isValid(user)) {
      store.dispatch(NotifyActions.addNotify({
        title : 'Login Credentials',
        message : 'Employee ID is required',
        type: 'warning',
        duration : 2000,
      })
    )
    } else if (!new RequiredValidation().isValid(pass)) {
        store.dispatch(NotifyActions.addNotify({
          title : 'Login Credentials',
          message : 'Password is required',
          type: 'warning',
          duration : 2000,
        })
      )
    }
    else {
      this.presenter.login(this.state.username, this.state.password)
    }
  }


  render () {
    const {
      showOtpModal,
      username,
      password,
      terms,
      showTermsAndCondition,
      status,
      disabled,
      type,
    } = this.state
    const { notify } = this.props

    return (
      <div>
        { super.render() }
        {
          // TODO properly show otp modal as 'modal', not by just swapping views lol
          showOtpModal &&
          <OtpModal
            show = { showOtpModal }
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
          <div className={ 'login-version' }>v 4.5.2</div>
          <img className = { 'login-logo' } src = { require('../../images/profile-picture.png')} />
            <br/>
            <GenericInput
              autocomplete='off'
              onChange = { e =>
                this.setState({ username: e.target.value }) }
              text = { 'Employee ID' }
              type = { 'text' }/>
            <GenericInput
              autocomplete = { 'off' }
              onChange = { e =>
                this.setState({ password: e.target.value }) }
              text = { 'Password' }
              type = { type }
              className = { 'password__input' }/>
            <span
              className = { `password_icon password_${ status }` }
              onClick = { this.showHide }>
              { type === 'input' ? '' : ''}
            </span>
            {
              disabled ?
              <center className = { 'login-loader' }>
                <CircularLoader show = { true }/>
              </center>              :
              <div>
                <br/>
                <br/>
                  <GenericButton
                    disabled = { disabled }
                    text = { 'LOGIN' }
                    onClick = { () =>
                      this.proceedToValidation( username, password )
                    }/>
                <br/>
                <br/>
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
              <button className = {'link-googleplay'} onClick = { () => this.downloadAndroid() } />
              <button className = {'link-appstore'} onClick = { () => this.downloadIOS() } />
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
  notify : state.notify.notify
})

export default ConnectView(connect(mapStateToProps)(LoginView), LoginPresenter)
