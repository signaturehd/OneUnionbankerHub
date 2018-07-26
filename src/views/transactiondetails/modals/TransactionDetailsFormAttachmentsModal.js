import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components'

class TransactionDetailsAgreementsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClose, fileAttachments } = this.props
  return (
    <Modal
      isDismisable = { true }
      width = { 50 }
      onClose = { onClose }
    >
      <div className={ 'transaction-attachments-container' }>
        {
          fileAttachments &&
          fileAttachments.map((image, key) => (
            <img
              key = { key }
              className = { 'transaction-attachments _img-ub-logo' }
              src = { image }
            />
          ))
        }
      </div>
    </Modal>
    )
  }
}

TransactionDetailsAgreementsModal.propTypes = {
  onClose: PropTypes.func,
  fileAttachments: PropTypes.object,
}

export default TransactionDetailsAgreementsModal
