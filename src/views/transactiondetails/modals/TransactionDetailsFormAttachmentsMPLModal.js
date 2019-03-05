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
      <h2 className = { 'text-align-center' } >Attachments</h2>
      <br/>
      <div className={ 'transacion-attachments-grid' }>
      {
        attachments.map((resp, key) =>
        <img
          key = { key }
          className = { 'transaction-attachments _img-ub-logo-transaction-details' }
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
