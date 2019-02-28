
import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericButton, Line } from '../../../ub-components'

class PersonalResumeViewerComponent extends Component {
  constructor (props) {
    super (props)
  }

  checkDocumentFormat () {
  }

  render () {
    const {
      pdfViewing,
      onViewPdf
    } = this.props

    return (
      <Card className = { 'padding-10px' }>
        <div classNme = { 'text-align-left' }>
          <GenericButton
            text = { 'back' }
            onClick = { () => onViewPdf(false) }
            className = {  'profile-button-small cursor-pointer global-button' }
          />
        </div>
        <br/>
        <h4 className = { 'font-size-18px unionbank-color-grey font-weight-bold' }>My Resume</h4>
        <br/>
        <Line/>
        <br/>
        <iframe src = {pdfViewing ? pdfViewing : 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf'}
          style = {{
            height: 700,
            width: '100%'
          }}
        >
        </iframe>
      </Card>
    )
  }
}

PersonalResumeViewerComponent.propTypes = {
}

PersonalResumeViewerComponent.defaultProps = {
}

export default PersonalResumeViewerComponent
