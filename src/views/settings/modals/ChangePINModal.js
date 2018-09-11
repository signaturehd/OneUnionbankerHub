import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line, GenericButton, GenericInput, CircularLoader  } from '../../../ub-components/'


import { RequiredNumberValidation } from '../../../utils/validate/'
import './styles/contactModal.css'

class ChangePINModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
      uniqueOldPIN: '',
      uniqueNewPIN: ''
    }
  }

  render () {
    const {
      onClose,
      enabledLoader,
      backgroundColor,
      onSubmitPinCode
    }=this.props

    const {
      isDismisable,
      uniqueOldPIN,
      uniqueNewPIN
    }=this.state

    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }>
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
                  <h2 className = { 'font-size-14px' }> Change PIN </h2>
                </div>
                <br/>
                <GenericInput
                  className = { 'generic-pin' }
                  hint = { '* * * * *' }
                  type = { 'password' }
                  maxLength = { 5 }
                  text = { 'Old PIN' }
                  onChange = { (e) => {
                    new RequiredNumberValidation().isValid(e.target.value) ?
                    this.setState({ uniqueOldPIN : e.target.value }) :
                    this.setState({ uniqueOldPIN : '' })
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
                      this.setState({ uniqueNewPIN : e.target.value }) :
                      this.setState({ uniqueNewPIN : '' })
                      }
                    }
                    value = { uniqueNewPIN }
                    />
                <GenericButton
                  onClick = { () => onSubmitPinCode(uniqueOldPIN, uniqueNewPIN) }
                  text = { 'Continue' }
                  />
              </center>
            }
          </div>
        </Modal>
      )
    }
  }
ChangePINModal.propTypes={
  onClose : PropTypes.func,
  onSubmitPinCode : PropTypes.func,
}

export default ChangePINModal
