import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
} from '../../../../ub-components/'


import { RequiredNumberValidation, RequiredValidation } from '../../../../utils/validate/'

class AffirmationEnrollPinModal extends Component {
  constructor(props) {
    super(props)
  }

  onSubmit (pin) {
    thi.props.sendPinProps (pin)
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  onSubmit (pin) {
    if(!this.validator(pin)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Authentication' ,
         message : 'Pin is required',
         type : 'warning',
         duration : 2000
       })
     )
   } else {
     console.log(pin)
     // this.presenter.validateEmployeePin(pin)
    }
  }

  render() {
    const {
      onClose,
      enabledLoader,
      uniquePIN,
      sendPinProps
    } = this.props

    return (
    <Modal
      width = { 40 }
      >
      <div>
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <h2>Please wait while we validate your PIN</h2>
            <br/>
            <CircularLoader show = { enabledLoader }/>
          </center> :
          <center>
            <div className = { 'grid-global-row' }>
              <span className = { 'pinlock-icon lock-icon-settings' }/>
              <h2 className = { 'font-size-12px' }>Please enter your registered digital signature (PIN).</h2>
            </div>
            <GenericInput
              className = { 'generic-pin' }
              hint = { '* * * * *' }
              maxLength = { 5 }
              type = { 'password' }
              onChange = { (e) => {
                new RequiredNumberValidation().isValid(e.target.value) ?
                sendPinProps (e.target.value) :
                sendPinProps ('')
                }
              }
              value = { uniquePIN }
              errorMessage = { 'Please enter your 5-digit PIN' }
              />
            <br/>
            <GenericButton
              type = { 'button' }
              text = { 'Submit' }
              onClick = {
                () => {
                  this.onSubmit(uniquePIN)
                }
              }
              className={ 'compliance-buttons compliance-submit' }
              />
          </center>
        }
      </div>
    </Modal>
    )
  }
}

AffirmationEnrollPinModal.propTypes = {
  onClose : PropTypes.func
}

export default AffirmationEnrollPinModal
