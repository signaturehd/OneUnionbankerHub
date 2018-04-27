import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'
import { GenericTextBox } from '../../ub-components/TextBox/'
import { GenericButton } from '../../ub-components/UButton/'

import Presenter from './presenter/AccountNumberPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

class AccountNumberModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      accountNumber : ''
    }

  }

  render () {
    const { onClose, details } = this.props
    const { accountNumber } = this.state
    return (
      <Modal
        onClose = { onClose }
      >
      { super.render() }
        <GenericTextBox
          placeholder = "Account Number"
          type = ""
          onChange={ e => this.setState({ accountNumber: e.target.value }) }  />
          <br/>
        <GenericButton text= "Submit" onClick={ () => this.presenter.validateAccountNumber(accountNumber) } />
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

export default ConnectPartial(AccountNumberModal, Presenter)
