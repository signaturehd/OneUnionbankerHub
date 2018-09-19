import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../../ub-components/'


class AffirmationDocumentPreviewModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClose } = this.props
    return(
    <Modal
      onClose = { onClose }
      isDismisable = { true }
      >
      <h2>test</h2>
    </Modal>
    )
  }
}

AffirmationDocumentPreviewModal.propTypes = {
  onClose : PropTypes.func
}

export default AffirmationDocumentPreviewModal
