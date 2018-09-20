import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
} from '../../../../ub-components/'

class AffirmationDocumentPreviewModal extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      onClose,
      pdfFile,
      showPinCodeModalFunc
    } = this.props

    return (
      <Modal
        width = { 70 }
        onClose = { onClose }
        isDismisable = { true }
        >
        <iframe src = { pdfFile }
          style = {{
            height: 500,
            width: '100%'
          }}
        >
        </iframe>
        <br/>
        <br/>
        <center>
        <GenericButton
          onClick = { () => showPinCodeModalFunc() }
          text = { 'I Affirm' }/>
        </center>
      </Modal>
    )
  }
}

AffirmationDocumentPreviewModal.propTypes = {
  onClose : PropTypes.func
}

export default AffirmationDocumentPreviewModal
