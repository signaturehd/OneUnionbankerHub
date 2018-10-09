import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
} from '../../../../ub-components/'


class AuthorizationBackgroundPreviewModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClose, pdfFile, showPinCodeModal } = this.props
    return(
    <Modal
      width = { 70 }
      onClose = { onClose }
      isDismisable = { true }
      >
      {
        pdfFile ?
        <iframe
          src = { pdfFile }
          style = {{
            height: 750,
            width: '100%'
          }}
        >
        </iframe>
        :
        <center>File not found</center>
      }
      <br/>
      <br/>
      <center>
      <GenericButton
        onClick = { onClose }
        text = { 'Close' }/>
      </center>
    </Modal>
    )
  }
}

AuthorizationBackgroundPreviewModal.propTypes = {
  onClose : PropTypes.func
}

export default AuthorizationBackgroundPreviewModal
