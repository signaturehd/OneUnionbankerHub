import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import '../styles/birStyle.css'

class Bir1902ViewPdfComponent extends Component {
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
        <div className = { 'bio-document-padding' }>
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

Bir1902ViewPdfComponent.propTypes = {
  onClose : PropTypes.func,
  title : PropTypes.bool,
}
Bir1902ViewPdfComponent.defaultProps = {
  title : 'BIR 1902 Form'
}

export default Bir1902ViewPdfComponent
