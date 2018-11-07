import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import '../styles/phStyle.css'

class PhilHealthPdfViewerComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      pdfFile,
      title
    } = this.props

    return (
      <div  className = { 'cursor-pointer' }>
        <br/>
        <h2 className = { 'font-weight-bold text-align-center' }>
          { title }
        </h2>
        <br/>
        <div className = { 'ph-document-padding' }>
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
        <div>
          <br/>
          <center>
          <GenericButton
            onClick = { () => onClose() }
            text = { 'Close' }/>
          </center>
        </div>
        <br/>
      </div>
    )
  }
}

PhilHealthPdfViewerComponents.propTypes = {
  onClose : PropTypes.func,
  title : PropTypes.bool,
}
PhilHealthPdfViewerComponents.defaultProps = {
  title : 'PhilHealth Form'
}

export default PhilHealthPdfViewerComponents
