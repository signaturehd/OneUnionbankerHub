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
  }

  render () {
    const {
      idReplace,
      usernameId,
      birthDate,
      onCheckUserName,
      onChageBirthDate,
      requestEmailFunc,
      showEmailMessageModal,
      onCloseSuccessModal,
      emailSuccessMessage
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
        <h2>Recover Password</h2>
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

LoginForgotPasswordFragment.propTypes = {
}

export default LoginForgotPasswordFragment
