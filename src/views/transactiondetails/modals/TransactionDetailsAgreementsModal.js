import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components'

class TransactionDetailsFormAttachmentsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClose, agreements } = this.props
  return (
    <Modal
      isDismisable = { true }
      width = { 50 }
      onClose = { onClose }
    >
    <center> Attachments </center>
      {
        agreements && agreements.FormAgreements.map ((formAgreement, key) =>
        <center key = { key }>
            <div dangerouslySetInnerHTML = {{ __html : formAgreement }}></div>
        </center>
        )
      }
    </Modal>
    )
  }
}

TransactionDetailsFormAttachmentsModal.propTypes = {
  onClose: PropTypes.func,
  agreements: PropTypes.array,
}

export default TransactionDetailsFormAttachmentsModal
