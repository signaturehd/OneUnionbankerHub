import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../ub-components/'

import '../styles/postEmploymentStyle.css'

class PostEmploymentViewComponent extends Component {
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
      <div className = { 'cursor-pointer' }>
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

PostEmploymentViewComponent.propTypes = {
  onClose : PropTypes.func,
  bioTitle : PropTypes.bool,
}
PostEmploymentViewComponent.defaultProps = {
  bioTitle : 'Biographical Data Form'
}

export default PostEmploymentViewComponent
