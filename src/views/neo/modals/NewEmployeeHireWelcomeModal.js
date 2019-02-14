import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

import './styles/neoModal.css'

class NewEmployeeHireWelcomeModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onStartOnboard } = this.props

    return (
      <Modal
        width = { 50 }
      >
        <center>
          <h4 className = { 'neo-modal-title font-size-40px unionbank-color-grey font-weight-lighter' }>DIGITAL NEO</h4>
          <br/>
          <h4 className = { 'unionbank-color-grey font-size-14px font-weight-lgither neo-modal-subtitle' }>NEW EMPLOYEE-ONBOARDING</h4>
          <br/>
          <p className = { 'unionbank-color-grey font-size-14px font-weight-lighter' }>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className = { 'font-size-14px font-weight-lighter unionbank-color-grey' }>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <GenericButton
            className = { 'global-button cursor-pointer profile-button-medium' }
            onClick = { () => onStartOnboard() }
            text = { 'Start' }
            />
        </center>
      </Modal>
    )
  }
}
NewEmployeeHireWelcomeModal.propTypes = {
  onClose : PropTypes.func,
}

export default NewEmployeeHireWelcomeModal
