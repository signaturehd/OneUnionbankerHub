import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import '../styles/authorizationStyle.css'

class AuthorizationBackgroundCheckViewPdfComponent extends Component {
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
      <div className = { 'cursor-pointer' }>
        <br/>
        <h2 className = { 'font-weight-bold text-align-center' }>
          { title }
        </h2>
        <br/>
        <div className = { 'abc-document-padding' }>
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

AuthorizationBackgroundCheckViewPdfComponent.propTypes = {
  onClose : PropTypes.func,
  title : PropTypes.bool,
}
AuthorizationBackgroundCheckViewPdfComponent.defaultProps = {
  title : 'Authorization for Background Check'
}

export default AuthorizationBackgroundCheckViewPdfComponent
