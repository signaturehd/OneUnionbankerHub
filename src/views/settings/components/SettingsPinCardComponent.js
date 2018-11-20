import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Card,
  GenericButton
} from '../../../ub-components/'

import '../modals/styles/contactModal.css'

import SettingsAccountChangePinComponent  from './SettingsAccountChangePinComponent'

class SettingsPinCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      uniqueNewPIN,
      uniqueOldPIN,
      enabledLoader,
      showChangePinComponent,
      showUnlockPinComponent,
      showPinSettingsComponent,
      showChangePinComponentFunc,
      showUnlockPinComponentFunc,
      onSubmitPinCode,
      showPinSettingsComponentFunc,
      showPinComponentFunc,
      uniqueOldPINFunc,
      uniqueNewPINFunc
    } = this.props

    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-padding' }>
          <div>
            <h2 className={ 'unionbank-color font-weight-normal' }>
              PIN Settings
            </h2>
            <br/>
            <div className = { 'pin-settings-card-grid' }>
              <div></div>
              {
                showChangePinComponent &&
                <SettingsAccountChangePinComponent
                  uniqueOldPINFunc = { (e) => uniqueOldPINFunc(e) }
                  uniqueNewPINFunc = { (e) => uniqueNewPINFunc(e) }
                  showPinSettingsComponentFunc = { (e) => showPinSettingsComponentFunc(e) }
                  showChangePinComponentFunc = { (e) => showChangePinComponentFunc(e) }
                  uniqueNewPIN = { uniqueNewPIN }
                  uniqueOldPIN = { uniqueOldPIN }
                  enabledLoader = { enabledLoader }
                  onSubmitPinCode = { (uniqueOldPIN, uniqueNewPIN) => onSubmitPinCode(uniqueOldPIN, uniqueNewPIN) }
                />
              }
              {
                showPinSettingsComponent &&
                <div>
                  <div className = { 'text-align-center grid-global-rows' }>
                    <Card
                      className = { 'pin-settings-grid cursor-pointer' }
                      onClick = { () => {
                          showChangePinComponentFunc(true)
                          showPinSettingsComponentFunc(false)
                      }}
                      >
                      <h2 className = { 'text-align-left' }>I want to Change my Account PIN</h2>
                      <span className = { 'login-icon login-seemore-button' }/>
                    </Card>
                    <Card
                      className = { 'login-help-grid cursor-pointer' }
                      onClick = { () =>
                        showUnlockPinComponentFunc()
                      }
                      >
                      <h2 className = { 'text-align-left' }>I want to Unlock my Account PIN</h2>
                      <span className = { 'login-icon login-seemore-button' }/>
                    </Card>
                  </div>
                  <center>
                    <br/>
                    <GenericButton
                      text = { 'Back' }
                      className = { 'profile-button-small global-button' }
                      onClick = { () =>
                        showPinComponentFunc(false)
                      }
                    />
                  </center>
                </div>
              }
              <div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SettingsPinCardComponent.propTypes={
}

export default SettingsPinCardComponent
