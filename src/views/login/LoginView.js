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
  GenericInput,
  Modal
} from '../../ub-components'

import './styles/login.css'
import moment  from 'moment'

import OtpModal from '../otp/OtpModal'
import TermsModal from '../termsandcondition/TermsModal'

import { connect } from 'react-redux'

import store from '../../store'
import { NotifyActions } from '../../actions'

import LoginForgotPasswordComponent from './fragments/LoginForgotPasswordFragment'
import LoginUserIdGuideComponent from './fragments/LoginUserIdGuideFragment'
import LoginGuideUnlockProfileFragment from './fragments/LoginGuideUnlockProfileFragment'
import LoginGuideUserPasswordFragment from './fragments/LoginGuideUserPasswordFragment'
import LoginOtpGuideFragment from './fragments/LoginOtpGuideFragment'

function LoginComponent (props) {
  const id = props.componentId
  const history = props.history
  const idReplace = props.idReplace
  const onCheckUserName = props.onCheckUserName
  const onChageBirthDate = props.onChageBirthDate
  const birthDate = props.birthDate
  const resetPassword = props.resetPassword
  const usernameId = props.usernameId
  const showEmailMessageModal = props.showEmailMessageModal
  const emailSuccessMessage = props.emailSuccessMessage
  const onCloseSuccessModal = props.onCloseSuccessModal
  const setConfirmPassword = props.setConfirmPassword
  const setNewPassword = props.setNewPassword
  const requestEmailFunc = props.requestEmailFunc
  const newPassword = props.newPassword
  const confirmNewPassword = props.confirmNewPassword
  const requestUnlockFunc = props.requestUnlockFunc

  if(id === 0) {
    return <LoginForgotPasswordComponent
      confirmNewPassword = { confirmNewPassword }
      newPassword = { newPassword }
      requestEmailFunc = { () => requestEmailFunc() }
      idReplace = { () => idReplace() }
      history = { history }
      emailSuccessMessage = { emailSuccessMessage }
      usernameId = { usernameId }
      resetPassword = { () => resetPassword() }
      onCloseSuccessModal = { () => onCloseSuccessModal() }
      birthDate = { birthDate }
      setNewPassword = { (newPassword) => setNewPassword(newPassword) }
      setConfirmPassword = { (confirmPassword) => setConfirmPassword(confirmPassword) }
      onCheckUserName = { (e) => onCheckUserName(e) }
      onChageBirthDate = { (e) => onChageBirthDate(e) }
      showEmailMessageModal = { showEmailMessageModal }
      />
  } else if (id === 1) {
    return <LoginGuideUnlockProfileFragment
      idReplace = { () => idReplace() }
      onCheckUserName = { (e) => onCheckUserName(e) }
      onChageBirthDate = { (e) => onChageBirthDate(e) }
      requestUnlockFunc = { () => requestUnlockFunc() }
      birthDate = { birthDate }
      usernameId = { usernameId }
      />
  } else if (id === 2) {
    return <LoginUserIdGuideComponent
      idReplace = { () => idReplace() }
      />
  } else if (id === 1) {
    return <LoginUserIdGuideComponent
      idReplace = { () => idReplace() }
      />
  } else if (id === 3) {
    return <LoginGuideUserPasswordFragment
      idReplace = { () => idReplace() }
      />
  } else if (id === 4) {
    return <LoginOtpGuideFragment
      idReplace = { () => idReplace() }
      />
  }
}

class LoginView extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      showTermsAndCondition : false,
      showOtpModal: false,
      showHelpDeskComponent: false,
      showLoginComponent: false,
      disabled : false,
      showEmailMessageModal : false,
      showResetModal : false,
      resetLoader : false,
      showRequestOtpModal : false,
      resetSuccessMessageModal : false,
      username: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      componentId: '',
      usernameId: '',
      birthDate: '',
      emailSuccessMessage: '',
      resetSuccessMessage: '',
      requiredOtp: '',
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

  getSupportURL () {
    return location.origin + '/support/'
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

  showResetLoader () {
    this.setState({ resetLoader : true })
  }

  hideResetLoader () {
    this.setState({ resetLoader : false })
  }

  onLoginSuccess (otpMessage) {
    this.setState({ showOtpModal: true, otpMessage })
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
        message : 'Employee ID is required ',
        type: 'warning',
        duration : 10000,
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

  showGetOtpModal (successMessage) {
    this.setState({ successMessage, showResetModal : true })
  }

  showNotificationMessage (emailSuccessMessage) {
    this.setState({ emailSuccessMessage, showEmailMessageModal : true })
  }

  hideHelpDeskComponent (resetSuccessMessage) {
    this.setState({
      resetSuccessMessage,
      resetSuccessMessageModal : true,
      showHelpDeskComponent : false,
      showLoginComponent : false,
      birthDate: '',
      usernameId: ''
    })
  }

  render () {
    const {
      showOtpModal,
      username,
      password,
      newPassword,
      confirmNewPassword,
      terms,
      showTermsAndCondition,
      showHelpDeskComponent,
      showLoginComponent,
      status,
      disabled,
      resetLoader,
      type,
      componentId,
      usernameId,
      birthDate,
      showEmailMessageModal,
      showResetModal,
      emailSuccessMessage,
      otpMessage,
      showRequestOtpModal,
      requiredOtp,
      resetSuccessMessage,
      resetSuccessMessageModal,
    } = this.state

    const {
      notify,
      history
    } = this.props

    /* Prod Version 6.3.0 */

    /* UAT 7.0.0*/

    /* Added new Team Goals */

    let version = 7
    let majorVersion = 4
    let minorVersion = 1
    let versionNumber = version + '.' + majorVersion + '.' + minorVersion

    const objectValue = [{
      id : 0,
      name : 'I forgot my password'
    } ,{
      id : 1,
      name : 'I want to Unlock my Account'
    }, {
      id : 2,
      name : 'What is my 1UHub user ID?'
    }, {
      id : 3,
      name : 'What is my 1UHub password?'
    }, {
      id : 4,
      name : `Why can't i receive my OTP?`
    }]

    return (
      <div>
        { super.render() }
        {
          resetSuccessMessageModal &&
          <Modal>
            <center>
              <br/>
              <h2>{ resetSuccessMessage && resetSuccessMessage.message }</h2>
              <br/>
              <GenericButton
                text = { 'Ok' }
                onClick = { () => this.setState({ resetSuccessMessageModal : false }) }
                />
            </center>
          </Modal>
        }
        {
          showResetModal &&
          <Modal>
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
                onChange={ (e) => this.setState({ requiredOtp: e.target.value }) }
                errorMessage = { 'Please enter your 6-digit code' }
              />
              <br/>
              <GenericButton
                text = { 'Submit' }
                onClick = { () => {
                    this.presenter.requestNewPassword(
                      requiredOtp,
                      moment(birthDate).format('MM/DD/YYYY'),
                      usernameId,
                      newPassword,
                      confirmNewPassword)
                    this.setState({ showResetModal : false })
                  }
                }
               />
             <br/>
          </center>
        </Modal>
        }
        {
          // TODO properly show otp modal as 'modal', not by just swapping views lol
          showOtpModal &&
          <OtpModal
            show = { showOtpModal }
            onClose = { () => this.setState({ showOtpModal : false }) }
            parent = { this }
            otpMessage = { otpMessage }
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
          {
            showHelpDeskComponent ?

            <div>
              {
                showLoginComponent ?
                <div>
                  <br/>
                  {
                    resetLoader ?
                    <CircularLoader
                      validateLoading = { false }
                      show = { resetLoader }/>
                    :
                    <LoginComponent
                      requestEmailFunc = { () =>
                        this.presenter.requestEmailVerification(
                          usernameId,
                          birthDate,
                          newPassword,
                          confirmNewPassword) }
                      requestUnlockFunc = { () =>
                        this.presenter.requestUnlockAccount(usernameId, birthDate)
                      }
                      emailSuccessMessage = { emailSuccessMessage }
                      showEmailMessageModal = { showEmailMessageModal }
                      idReplace = { () => this.setState({ showLoginComponent : false }) }
                      componentId = { componentId }
                      birthDate = { birthDate }
                      onCheckUserName = { (usernameId) => this.setState({ usernameId }) }
                      hisptory = { history }
                      setConfirmPassword = { (confirmNewPassword) => this.setState({ confirmNewPassword }) }
                      setNewPassword = { (newPassword) => this.setState({ newPassword }) }
                      usernameId = { usernameId }
                      newPassword = { newPassword }
                      confirmNewPassword = { confirmNewPassword }
                      onChageBirthDate = { (birthDate) => this.setState({ birthDate }) }
                      resetPassword = { () => this.presenter.resetPassword() }
                      onCloseSuccessModal = { () => {
                        this.setState({ showEmailMessageModal : false, showResetModal : true })
                      } }
                      />
                  }
                </div>
                :
                <div>
                  <br/>
                  <br/>
                  <div className = { '' }>
                    <span/>
                    <div>
                      <h2 className = { 'font-size-18px text-align-left font-weight-bold' }>
                        Having trouble signing in?
                      </h2>
                      <br/>
                      <h4 className = { 'text-align-left font-weight-normal font-size-12px' }>
                        Dont worry! Let us know your concern so we can assist you.
                      </h4>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <div>
                    {
                      objectValue.map((resp, key) =>
                        (
                          <div>
                            <Card
                              className = { 'login-help-grid cursor-pointer' }
                              key = { key }
                              onClick = { () => this.setState({ componentId : resp.id, showLoginComponent : true }) }
                              >
                              <h2 className = { 'text-align-left' }>{ resp.name }</h2>
                              <span className = { 'login-icon login-seemore-button' }/>
                            </Card>
                          </div>
                        )
                      )
                    }
                  </div>
                  <br/>
                  <br/>
                  {
                    showLoginComponent ?
                    <GenericButton
                      className = { 'global-button' }
                      onClick = { () => this.setState({ showLoginComponent : false }) }
                      text = { 'Back' }
                    />
                    :
                    <GenericButton
                      className = { 'global-button' }
                      onClick = { () => this.setState({ showHelpDeskComponent : false }) }
                      text = { 'Back' }
                    />
                  }
                </div>
              }
            </div>
              :
            <div>
              {
                // <img className = { 'login-logo' } src = { require('../../images/drawer/1uhub_halloween_logo.jpg')} />
              }
              <img className = { 'login-logo' } src = { require('../../images/WEB and LOGO/1UHub Logo_Gotham_2.png')} />
                <br/>
                <GenericInput
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
                  <div style = {{ marginBottom: '12px'}}>
                  <br/>
                  <br/>
                  <br/>
                  <CircularLoader
                    validateLoading = { false }
                    show = { true }/>
                  <br/>
                  <br/>
                  </div>        :
                  <div>
                    <GenericButton
                      disabled = { disabled }
                      text = { 'LOGIN' }
                      onClick = { () =>
                        this.proceedToValidation( username, password )
                      }/>
                    <br/>
                    <br/>
                    <h2
                      onClick = { () => this.setState({ showHelpDeskComponent : true }) }
                      className = { 'font-weight-normal font-size-11px cursor-pointer' }>
                      Having trouble signing in?
                    </h2>
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
                <center>
                </center>
                <div className = {'download-container'}>
                  <button className = {'link-googleplay'} onClick = { () => this.downloadAndroid() } />
                  <button className = {'link-appstore'} onClick = { () => this.downloadIOS() } />
                </div>
                <br/>
                <div className = { 'grid-global login-adjustment-for-version' }>
                  <h2
                    onClick = { () => window.open(this.getSupportURL()) }
                    className = { 'unionbank-color font-size-12px text-align-left cursor-pointer' }>Learn More.</h2>
                  <div className={ 'login-version' }>v { versionNumber }</div>
                </div>
            </div>
          }
        </Card>
    </div>
    )
  }
}
const mapStateToProps = state => ({
  notify : state.notify.notify
})

export default ConnectView(connect(mapStateToProps)(LoginView), LoginPresenter)
