import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../../ub-components/'

import './styles/educationComponentStyle.css'

class EducationVerificationComponent extends Component {
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
      <Card>
        <div>
        <br/>
          <h2 className = { 'font-weight-bold text-align-center' }>
            { title }
          </h2>
          <br/>
          <div className = { 'educ-document-padding' }>
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
      </Card>
    )
  }
}

EducationVerificationComponent.propTypes = {
  onClose : PropTypes.func,
  title : PropTypes.string,
}
EducationVerificationComponent.defaultProps = {
  title : 'School Record Verification Form'
}

export default EducationVerificationComponent
