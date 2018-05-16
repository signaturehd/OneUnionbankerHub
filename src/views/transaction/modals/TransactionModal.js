import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader } from '../../../ub-components/'

import './styles/transaction-modal.css'

class TransactionModal extends Component {
  constructor (props) {
    super(props)
  }

 componentDidMount () {
    this.props.presenter()
 }


 render () {
    const {
      onClose,
      transactionResponse,
      transaction
    } = this.props
    // TODO map the transaction details here
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          transactionResponse ?
          <h1>hello world</h1>
          :
          <center>
            <h3> Please wait while we are getting your transaction </h3>
            <CircularLoader show = {true} />
          </center>

        }
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default TransactionModal
