import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Modal,
  Line,
  Card,
  GenericButton,
  GenericInput,
  CircularLoader
} from '../../../ub-components/'

import { RequiredNumberValidation } from '../../../utils/validate/'

import '../modals/styles/contactModal.css'

class SettingsAccountChangePinComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      uniqueOldPIN,
      uniqueNewPIN,
      uniqueOldPINFunc,
      uniqueNewPINFunc,
      onSubmitPinCode,
      enabledLoader,
      showChangePinComponentFunc,
      showPinSettingsComponentFunc
    }=this.props

    return (
      <div className = { 'pin-settings-card-grid' }>
        <div></div>
        <div>
          {
            enabledLoader ?
            <center>
              <CircularLoader show = { true }/>
            </center>
            :
            <div>
              <center>
                <div className = { 'grid-global-row' }>
                  <div>
                    <span className = { 'pinlock-icon-black lock-icon-settings' }/>
                    <br/>
                  </div>
                  <h2 className = { 'font-size-14px' }>Change Account PIN</h2>
                </div>
                <br/>
              </center>
              <div>
                <GenericInput
                  className = { 'generic-pin' }
                  hint = { '* * * * *' }
                  type = { 'password' }
                  maxLength = { 5 }
                  text = { 'Old PIN' }
                  onChange = { (e) => {
                      new RequiredNumberValidation().isValid(e.target.value) ?
                      uniqueOldPINFunc(e.target.value) :
                      uniqueOldPINFunc('')
                      console.log(e)
                    }
                  }
                  value = { uniqueOldPIN }
                  />
                  <GenericInput
                    text = { 'New PIN' }
                    className = { 'generic-pin' }
                    type = { 'password' }
                    hint = { '* * * * *' }
                    maxLength = { 5 }
                    onChange = { (e) => {
                      new RequiredNumberValidation().isValid(e.target.value) ?
                      uniqueNewPINFunc(e.target.value) :
                      uniqueNewPINFunc('')
                      }
                    }
                    value = { uniqueNewPIN }
                    />
                  <center>
                  <div className = { 'grid-global' }>
                    <GenericButton
                      className = { 'profile-button-small global-button' }
                      onClick = { () => {
                          showChangePinComponentFunc(false)
                          showPinSettingsComponentFunc(true)
                      } }
                      text = { 'Back' }
                      />
                    <GenericButton
                      className = { 'profile-button-small global-button' }
                      onClick = { () => onSubmitPinCode(uniqueOldPIN, uniqueNewPIN) }
                      text = { 'Continue' }
                      />
                  </div>
                  </center>
              </div>
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

SettingsAccountChangePinComponent.propTypes={
}

export default SettingsAccountChangePinComponent
