import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import './styles/bioComponentStyle.css'

class BiographicalViewerComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      pdfFile,
      bioTitle
    } = this.props

    return (
      <div>
        <br/>
          <h2 className = { 'font-weight-bold text-align-center' }>
            { bioTitle }
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

BiographicalViewerComponent.propTypes = {
  onClose : PropTypes.func,
  bioTitle : PropTypes.bool,
}
BiographicalViewerComponent.defaultProps = {
  bioTitle : 'Biographical Data Form'
}

export default BiographicalViewerComponent
