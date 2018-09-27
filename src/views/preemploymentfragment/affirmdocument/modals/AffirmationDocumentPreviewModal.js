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
      showPinCodeModalFunc,
      nodeStatus,
      enabledLoader
    } = this.props

    return (
      <Modal
        width = { 70 }
        onClose = { onClose }
        isDismisable = { true }
        >
        <div>
          {
            enabledLoader ?
            <div>
              <center>
                <h2>Please wait while we we&#39;re retrieving the documents</h2>
                <br/>
                <CircularLoader show = { enabledLoader }/>
              </center>
            </div>
            :
            <div>
              <iframe src = { pdfFile }
                style = {{
                  height: 500,
                  width: '100%'
                }}
              >
              </iframe>
              <br/>
              {
                nodeStatus === 0 ||
                nodeStatus === null &&
              <div>
                <br/>
                <center>
                <GenericButton
                  onClick = { () => showPinCodeModalFunc() }
                  text = { 'I Affirm' }/>
                </center>
              </div>
              }
            </div>
          }
        </div>
      </Modal>
    )
  }
}

AffirmationDocumentPreviewModal.propTypes = {
  onClose : PropTypes.func,
  nodeStatus : PropTypes.number,
  enabledLoader : PropTypes.number,
}

export default AffirmationDocumentPreviewModal
