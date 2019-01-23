import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  Line,
  GenericButton,
  GenericInput,
  Card
} from '../../../../ub-components/'

import { validateEmail } from '../../../../utils/emailUtils'

class ContactInfoFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      updateEmail : false,
      updateContact : false,
      emailText : '',
      emailTextErrorMessage: '',
      contactNo : '',
      contactNoErrorMessage: '',
      defaultNumber : '09'
    }
  }

  checkEmail () {
    const email = this.state.emailText
    const extension = email.split('@')

    if(!validateEmail(email)) {
      this.setState({ emailTextErrorMessage : 'Please enter valid email' })
    } else if (extension[1] !== 'unionbankph.com' && extension[1] !== 'mercury.unionbankph.com') {
      this.setState({ emailTextErrorMessage : 'Invalid format.' })
    }else {
      this.setState({ emailTextErrorMessage : '' })
      this.props.onUpdateEmailAddressFunc(this.state.emailText)
      this.setState({ updateEmail: false })
    }
  }

  checkNumber () {
    const { defaultNumber, contactNo } = this.state
    const { onUpdateMobileNumberFunc } = this.props
    const contactNumber = defaultNumber + contactNo
    if(contactNumber === '09') {
      this.setState({ contactNoErrorMessage : 'Please enter contact number' })
    } else if (contactNumber.length !== 11) {
      this.setState({ contactNoErrorMessage : 'Contact number must be 11 characters.' })
    } else {
      onUpdateMobileNumberFunc(contactNumber)
      this.setState({ contactNoErrorMessage : '' })
      this.setState({ updateContact: false })
    }
  }

  render () {
    const {
      profileEmail,
      profileName,
      profileNumber,
      onUpdateEmailAddressFunc,
      onUpdateMobileNumberFunc
    } = this.props

    const {
      updateEmail,
      updateContact,
      emailText,
      emailTextErrorMessage,
      contactNo,
      contactNoErrorMessage,
      defaultNumber
    } = this.state

    return (
      <Card className={ 'profile-others-card padding-profileFragment' }>
        <div className={ 'profile-padding' }>
        <div className= { 'grid-global' }>
          <div>
            <div className={ 'contact-info-grid' }>
              <h2 className={ 'unionbank-color font-weight-normal padding-profileFragment-name' }>
                Contact Information
              </h2>
              <br/>
              <div>
                {
                  updateEmail ?

                  <div className = { 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeEmail' }/>
                    </div>
                    <div className = { 'profile-address-grid-x2' }>
                      <div className={ 'contact-info-grid-row' }>
                        <div className={ 'font-size-17px contact-title' }>
                          <h2>Email</h2>
                        </div>
                        <div className={ 'font-size-16px' }>
                          <GenericInput
                            errorMessage = { emailTextErrorMessage }
                            hint = { 'Enter Email Address' }
                            text = { '(e.g sample@unionbankph.com/@mercury.unionbankph.com)' }
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
                      </div>
                      <span
                        onClick = { () => this.setState({ updateEmail : false }) }
                        className = { 'profile-icon-settings editIconImage' }/>
                    </div>

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
              {
                  updateContact ?
                  <div className = { 'profile-grid-contact align-items-center' }>
                    <div>
                      <GenericInput
                        text = { 'Enter' }
                        type = { 'number' }
                        value = { defaultNumber }
                        disabled = { true }
                      />
                    </div>
                    <div>
                      <GenericInput
                        errorMessage = { contactNoErrorMessage }
                        text = { 'Contact Number' }
                        type = { 'number' }
                        hint = { 'e.g 09123456789' }
                        maxLength = { 10 }
                        onChange = { (e) => {
                            const contactNumber = defaultNumber + e.target.value
                            this.setState({ contactNo : e.target.value })
                            contactNumber.length !== 11 ?
                            this.setState({ contactNoErrorMessage : 'It must be 11 characters.' })
                            :
                            this.setState({ contactNoErrorMessage : '' })
                          }
                        }
                        value = { contactNo }
                      />
                    </div>
                    <div>
                      <GenericButton
                        className = { 'align-items-center global-button profile-button-small' }
                        onClick = { () => this.checkNumber() }
                        text = { 'Update' }
                      />
                    </div>
                  </div>
                  :
                  <div className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeMobileNumber' }/>
                    </div>
                    <div className = { 'profile-address-grid-x2' } >
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Mobile Number</h2>
                      </div>
                      <div className={ 'font-size-16px' }>
                        <a>+{ profileNumber ? profileNumber : '(Not Yet Provided)' }</a>
                      </div>
                    </div>
                    {
                      // <span
                      //   onClick = { () => this.setState({ updateContact : true }) }
                      //   className = { 'alignment-center profile-icon-settings editIconImage' }/>
                    }
                    </div>
                  </div>
                }
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Card>
    )
  }
}

export default ContactInfoFragment
