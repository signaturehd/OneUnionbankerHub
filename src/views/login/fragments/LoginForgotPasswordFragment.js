import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  GenericButton,
  DatePicker
} from '../../../ub-components/'

import moment from 'moment'

import '../styles/login.css'

import NoticeResponseModal from '../../notice/NoticeResponseModal'

class LoginForgotPasswordFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      type : 'password',
      status : 'hide',
      type2 : 'password',
      status2 : 'hide',
    }
    this.showHidePassword = this.showHidePassword.bind(this)
    this.showHideConfirmPassword = this.showHideConfirmPassword.bind(this)
  }


  showHidePassword (e) {
    e.preventDefault()
    e.stopPropagation()

    if(this.state.status === 'hide') {
      this.setState({
        status : 'show',
        type: this.state.type === 'text' ? 'password' : 'text'
      })
    } else if (this.state.status === 'show') {
      this.setState({
        status : 'hide',
        type: this.state.type === 'password' ? 'text' : 'password'
      })
    }
  }

  showHideConfirmPassword (e) {
    e.preventDefault()
    e.stopPropagation()

    if(this.state.status2 === 'hide') {
      this.setState({
        status2 : 'show',
        type2: this.state.type2 === 'text' ? 'password' : 'text'
      })
    } else if (this.state.status2 === 'show') {
      this.setState({
        status2 : 'hide',
        type2: this.state.type2 === 'password' ? 'text' : 'password'
      })
    }
  }

  render () {
    const {
      type,
      status,
      type2,
      status2
    } = this.state

    const {
      idReplace,
      usernameId,
      birthDate,
      onCheckUserName,
      onChageBirthDate,
      requestEmailFunc,
      showEmailMessageModal,
      onCloseSuccessModal,
      emailSuccessMessage,
      setNewPassword,
      setConfirmPassword,
      newPassword,
      confirmNewPassword,
    } = this.props

    return (
      <div>
        {
          showEmailMessageModal &&
          <NoticeResponseModal
            noticeResponse = { emailSuccessMessage }
            onClose = { () => onCloseSuccessModal() }
            />
        }
        <br/>
        <div
          className = { 'login-back-icon-grid cursor-pointer' }>
          <i
            onClick = { () => idReplace() }
            className = { 'back-arrow' }></i>
          <div></div>
        </div>
        <br/>
        <h2>Reset Password</h2>
        <br/>
        <br/>
          <GenericInput
            value = { usernameId }
            onChange = { e => onCheckUserName(e.target.value) }
            text = { 'Employee ID' }
            type = { 'text' }/>
          <DatePicker
            text = { 'Birth Date' }
            hint = { '(e.g mm/dd/yyyy)' }
            selected = { birthDate ? moment(birthDate) : '' }
            maxDate = { moment() }
            dateFormat = { 'MM/DD/YYYY' }
            onChange = { (e) => onChageBirthDate(e) }
            />
          <GenericInput
            onChange = { e => setNewPassword(e.target.value) }
            text = { 'New Password' }
            type = { type }
            value = { newPassword }
            className = { 'password__input' }/>
          <span
            className = { `password_icon password_${ status }` }
            onClick = { this.showHidePassword }>
            { type === 'text' ? '' : ''}
          </span>
          <GenericInput
            value = { confirmNewPassword }
            onChange = { e => setConfirmPassword(e.target.value) }
            text = { 'Confirm New Password' }
            type = { type2 }
            className = { 'password__input' }/>
          <span
            className = { `password_icon password_${ status2 }` }
            onClick = { this.showHideConfirmPassword }>
            { type2 === 'text' ? '' : ''}
          </span>
        <br/>
        <br/>
        <center>
          <GenericButton
            className = { 'global-button' }
            text = { 'Submit' }
            onClick = { () => requestEmailFunc() }
          />
        </center>
      </div>
    )
  }
}

export default LoginForgotPasswordFragment
