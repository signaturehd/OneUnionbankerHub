import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import './styles/affirmComponentStyle.css'

class AffirmationDocumentViewerComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      pdfFile,
      showPinCodeModalFunc,
      nodeStatus,
      enabledLoader,
      affirmTitle
    } = this.props

    return (
      <Card>
        {
          enabledLoader ?
          <div>
            <center>
              <br/>
              <h2>Please wait while we we&#39;re retrieving the documents</h2>
              <br/>
              <CircularLoader show = { enabledLoader }/>
              <br/>
            </center>
          </div>
          :
          <div>
          <br/>
            <h2 className = { 'font-weight-bold text-align-center' }>
              { affirmTitle }
            </h2>
            <br/>
            <div className = { 'affirm-document-padding' }>
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
            </div>
            <br/>
            {
              nodeStatus === 0 ?
            <div>
              <br/>
              <center>
              <GenericButton
                onClick = { () => showPinCodeModalFunc() }
                text = { 'I Acknowledge' }/>
              </center>
            </div>
            :
            <div>
              <br/>
              <center>
              <GenericButton
                onClick = { () => onClose() }
                text = { 'Close' }/>
              </center>
            </div>
            }
            <br/>
          </div>
        }
      </Card>
    )
  }
}

AffirmationDocumentViewerComponent.propTypes = {
  onClose : PropTypes.func,
  nodeStatus : PropTypes.number,
  enabledLoader : PropTypes.bool,
  showPinCodeModalFunc : PropTypes.func,
}

export default AffirmationDocumentViewerComponent
