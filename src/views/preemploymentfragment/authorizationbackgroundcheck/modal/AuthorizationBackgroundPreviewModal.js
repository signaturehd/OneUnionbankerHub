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
