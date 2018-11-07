import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  Line,
  GenericButton,
  GenericInput
} from '../../../ub-components/'

import '../modals/styles/contactModal.css'
import './styles/profileSettings.css'

import { validateEmail } from '../../../utils/emailUtils'

class SettingsContactInfoComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      updateEmail : false,
      emailText : '',
      emailTextErrorMessage: ''
    }
  }

  checkEmail () {
    const email = this.state.emailText
    const extension = email.split('@')

    if(!validateEmail(email)) {
      this.setState({ emailTextErrorMessage : 'Please enter valid email' })
    } else if (extension[1] !== 'unionbankph.com') {
      this.setState({ emailTextErrorMessage : 'Invalid format.\n(e.g sample@unionbankph.com)' })
    }else {
      this.setState({ emailTextErrorMessage : '' })
      this.props.onUpdateEmailAddressFunc(this.state.emailText)

      this.setState({ updateEmail: false })
    }
  }

  checkNumber () {

  }

  render () {
    const {
      profileEmail,
      profileName,
      profileNumber,
      onUpdateEmailAddressFunc
    } = this.props

    const {
      updateEmail,
      emailText,
      emailTextErrorMessage,
    } = this.state

    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-padding' }>
        <div className= { 'grid-global' }>
          <div>
            <br/>
            <div className={ 'contact-info-grid' }>
              <div>
                {
                  updateEmail ?

                  <div className = { 'profile-grid-description align-items-center' }>
                    <GenericInput
                      errorMessage = { emailTextErrorMessage }
                      text = { 'Enter Email Address' }
                      onChange = { (e) =>
                        this.setState({ emailText : e.target.value })
                      }
                      value = { emailText }
                      />
                    <GenericButton
                      className = { 'align-items-center global-button' }
                      className = { 'profile-button-small' }
                      onClick = { () => this.checkEmail () }
                      text = { 'Update' }
                      />
                  </div>
                  :
                  <div className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeEmail' }/>
                    </div>
                    <div className = { 'profile-address-grid-x2' }>
                      <div className={ 'contact-info-grid-row' }>
                        <div className={ 'font-size-17px contact-title' }>
                          <h2>Email</h2>
                        </div>
                        <div className={ 'font-size-16px' }>
                          <a>{ profileEmail ? profileEmail : '(Not Yet Provided)' }</a>
                        </div>
                      </div>
                      <span
                        onClick = { () => this.setState({ updateEmail : true }) }
                        className = { 'profile-icon-settings editIconImage' }/>
                    </div>
                  </div>
                }
              </div>
              <br/>
              <div className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeMobileNumber' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Mobile Number</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>+{ profileNumber ? profileNumber : '(Not Yet Provided)' }</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    )
  }
}

export default SettingsContactInfoComponent
