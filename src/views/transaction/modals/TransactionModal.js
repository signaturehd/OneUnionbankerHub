import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'

import './styles/transaction-modal.css'

class TransactionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionID: []
    }
  }

 componentDidMount () {
    this.props.presenter()
 }

 render () {
    const { onClose, transactionResponse } = this.props
    // TODO map the transaction details here
    console.log(transactionResponse)
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div>
        </div>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default TransactionModal
