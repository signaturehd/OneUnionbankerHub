import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { InputModal } from '../../ub-components/Modal'
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

      <InputModal
        onClose = { onClose }
        onChange = { e => this.setState({ accountNumber: e.target.value }) }
        placeholder = { 'Account Number' }
        type = { 'text' }
        onSubmit = { e => {
 e.preventDefault() , this.presenter.validateAccountNumber(accountNumber)
} }
      >
      { super.render() }
      </InputModal>
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
