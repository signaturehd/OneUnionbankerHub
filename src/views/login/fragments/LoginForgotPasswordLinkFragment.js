import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  GenericButton,
} from '../../../ub-components/'

import '../styles/login.css'

class LoginForgotPasswordLinkFragment extends Component {

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
      status2
    } = this.state

    const {
      idReplace
    } = this.props

    return (
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
            this.setState({ username: e.target.value }) }
          text = { 'Employee ID' }
          type = { 'text' }/>
        <GenericInput
          onChange = { e =>
            this.setState({ newPassword: e.target.value }) }
          text = { 'New Password' }
          type = { type }
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
          className = { 'password__input' }/>
        <span
          className = { `password_icon password_${ status2 }` }
          onClick = { this.showHideConfirmPassword }>
          { type2 === 'input' ? '' : ''}
        </span>
        <br/>
        <br/>
        <center>
          <div
            className = { 'cursor-pointer unionbank-color' }
            >
           <b
           onClick = { () => idReplace() }>Submit</b>
           <i className = { 'forward-arrow' }></i>
          </div>
        </center>
      </div>
    )
  }
}

LoginForgotPasswordLinkFragment.propTypes = {
}

export default LoginForgotPasswordLinkFragment
