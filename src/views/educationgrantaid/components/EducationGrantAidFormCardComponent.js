import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  Line,
  GenericButton,
  MultipleFileUploader } from '../../../ub-components/'

import './styles/educationComponentStyle.css'
import EducationGrantAidFileUploader from './EducationGrantAidFileUploader'


import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import moment from 'moment'

class EducationGrantAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
    const {
      grantAid,
      presenter,
      grantName,
      grantAmount,
      grantTypeFunc,
      attachment,
      attachmentsData,
      onClick,
      showEditSubmitButton
    } = this.props

    return (
      <div className = {'educ-container'}>

        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
              <GenericInput
                value = { grantAid.college }
                onChange = {() => {}}
                text = { 'College/Universities' }
                type = { 'text' }/>
              <GenericInput
                value = { grantAid.course }
                onChange = {() => {}}
                text = { 'Course' }
                type = { 'text' }/>
              <GenericInput
                value = { grantAid.academicYear }
                onChange = {() => {}}
                text = { 'Academic Year' }
                type = { 'text' }/>
              <GenericInput
                value = { grantAid.semester }
                onChange = {() => {}}
                text = { 'Semester' }
                type = { 'text' }/>
              <GenericInput
                value = { grantName }
                onClick = { () => grantTypeFunc() }
                text = { 'Type of Grant' }
                type = { 'text' }/>
              <GenericInput
                value = { grantAmount }
                onChange = {() => {}}
                text = { 'Grant Amount' }
                type = { 'text' }/>
              <br/>

              {
                attachment.lenght !==0 ?
                <div>
                <EducationGrantAidFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachment }
                    setFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
                    errorMessage = {
                      showEditSubmitButton ?
                      '' :
                      `Please upload the required attachments`  }
                  />
                </div>
                :
                <div></div>
              }
              <br/>
              <Line/>

              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = {
                  () => onClick(true, grantId, grantType, grantAmount, file, imagePreviewUrl)
                }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

EducationGrantAidFormCardComponent.propTypes = {
  grantName : PropTypes.string,
  grantAmount : PropTypes.string,
  grantTypeFunc : PropTypes.func,
  attachmentsData : PropTypes.array,
  showEditSubmitButton : PropTypes.bool
}

export default EducationGrantAidFormCardComponent
