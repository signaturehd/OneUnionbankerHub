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
      uniqueNewPINFunc,
      showRegisteredDevicesFunc
    } = this.props

    return (
      <Card className={ 'profile-others-card' }>
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
                  <div
                    className = { 'pin-settings-grid cursor-pointer' }
                    onClick = { () => {
                        showChangePinComponentFunc(true)
                        showPinSettingsComponentFunc(false)
                    }}
                    >
                    <h2 className = { 'text-align-left' }>Update PIN</h2>
                    <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>Click here to update your digital signature.</h2>
                  </div>
                  <br/>
                  <div
                    className = { 'in-settings-grid cursor-pointer' }
                    onClick = { () =>
                      showUnlockPinComponentFunc()
                    }
                    >
                    <h2 className = { 'text-align-left' }>Forgot PIN</h2>
                    <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>
                      Click here if you forgot your pin.</h2>
                  </div>
                  <br/>
                  <div
                    className = { 'in-settings-grid cursor-pointer' }
                    onClick = { () =>
                      showRegisteredDevicesFunc()
                    }
                    >
                    <h2 className = { 'text-align-left' }>Registered Devices</h2>
                    <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>
                      List of your devices registered with your fingerprint.</h2>
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
      </Card>
    )
  }
}

SettingsPinCardComponent.propTypes={
}

export default SettingsPinCardComponent
