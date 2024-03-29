import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components'

class TransactionDetailsFormAttachmentsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClose, attachments } = this.props

  return (
    <Modal
      isDismisable = { true }
      width = { 50 }
      onClose = { onClose }
    >
    <h2 className = { 'text-align-center' } >Attachments</h2>
    <br/>
    <div className = { 'transacion-attachments-grid' }>
      {
        attachments && attachments.map ((attachment, key) =>
        <img
          key = { key }
          className = { 'transaction-attachments _img-ub-logo-transaction-details' }
          src = { attachment }
        />
        )
      }
    </div>
    </Modal>
    )
  }
}

TransactionDetailsFormAttachmentsModal.propTypes = {
  onClose: PropTypes.func,
  attachments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default TransactionDetailsFormAttachmentsModal
