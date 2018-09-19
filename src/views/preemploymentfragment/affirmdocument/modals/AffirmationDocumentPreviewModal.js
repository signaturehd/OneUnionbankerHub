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
    const { onClose, pdfFile } = this.props
    return(
    <Modal
      onClose = { onClose }
      isDismisable = { true }
      >
      <iframe src = {pdfFile}
        style = {{
          height: 400,
          width: '100%'
        }}
      >
      </iframe>
    </Modal>
    )
  }
}

AffirmationDocumentPreviewModal.propTypes = {
  onClose : PropTypes.func
}

export default AffirmationDocumentPreviewModal
