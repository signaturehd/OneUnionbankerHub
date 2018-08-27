import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader, GenericInput } from '../../../ub-components/'

import { RequiredNumberValidation } from '../../../utils/validate/'

class CommonPinEnrollmentModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uniquePIN: ''
    }
  }

  render () {
    const {
      uniquePIN
    } = this.state
    const {
      hasPIN,
      onCloseModal,
      onSubmitPinCode,
      enabledLoader,
      className
    } = this.props
    return (
      <Modal
        width = { 30 }>
        <div>
          {
            enabledLoader ?
            <center>
              <CircularLoader show = { true }/>
            </center>
            :
            <center>
              <div className = { 'grid-global-row' }>
                <span className = { 'lock-icon lock-icon-settings' }/>
                <h2 className = { 'font-size-14px' }> Please enter your old pin for verification</h2>
              </div>
              <br/>
              <GenericInput
                className = { 'generic-pin' }
                hint = { '* * * * *' }
                maxLength = { 5 }
                type = { 'password' }
                onChange = { (e) => {
                  new RequiredNumberValidation().isValid(e.target.value) ?
                  this.setState({ uniquePIN : e.target.value }) :
                  this.setState({ uniquePIN : '' })
                  }
                }
                value = { uniquePIN }
                />
              <br/>
              <GenericButton
                onClick = { () => onSubmitPinCode(uniquePIN) }
                text = { 'Continue' }
                />
            </center>
          }
        </div>
      </Modal>
    )
  }
}

CommonPinEnrollmentModal.propTypes = {
  hasPIN : PropTypes.string,
  enabledLoader  : PropTypes.bool,
  onCloseModal  : PropTypes.func,
}

export default CommonPinEnrollmentModal
