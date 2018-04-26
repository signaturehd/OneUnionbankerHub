import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'
import { GenericTextBox } from '../../ub-components/TextBox/'
import { GenericButton } from '../../ub-components/UButton/'

class AccountNumberModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose, details } = this.props
    return (
      <Modal
        onClose = { onClose }
      >
        <GenericTextBox
          placeholder = "Account Number"
          type = ""
          onChange={ e => this.setState({ accountNumber: e.target.value }) }  />
        <GenericButton text= "Submit" onClick={ () => this.presenter.validateAccountNumber() } />
      </Modal>
    )
  }
}

AccountNumberModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object
}

AccountNumberModal.defaultProps = {

}

export default AccountNumberModal
