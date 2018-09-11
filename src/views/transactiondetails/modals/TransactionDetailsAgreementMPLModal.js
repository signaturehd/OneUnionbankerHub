import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components'

class TransactionDetailsAgreementMPLModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClose, agreements } = this.props

  return (
    <Modal
      isDismisable = { true }
      width = { 60 }
      onClose = { onClose }
    >
      {
      agreements && agreements.FormAgreements.map((formAgreement, key) =>
        (
        <div key = { key }>
            <div dangerouslySetInnerHTML = {{ __html : formAgreement.Form }}></div>
        </div>
        )
      )
    }
    </Modal>
    )
  }
}

TransactionDetailsAgreementMPLModal.propTypes = {
  onClose: PropTypes.func,
  agreements: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default TransactionDetailsAgreementMPLModal
