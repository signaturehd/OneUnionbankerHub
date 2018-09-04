import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components'

class TransactionDetailsFormAttachmentsMPLModal extends Component {
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
      <div className={ 'transaction-attachments-container' }>
      {
        attachments.map((resp, key) =>
        <img
          key = { key }
          className = { 'transaction-attachments _img-ub-logo' }
          src = { resp }
        />
        )
      }
      </div>
    </Modal>
    )
  }
}

TransactionDetailsFormAttachmentsMPLModal.propTypes = {
  onClose: PropTypes.func,
  fileAttachments: PropTypes.array,
}

export default TransactionDetailsFormAttachmentsMPLModal
