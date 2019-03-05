import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  Line,
  GenericButton } from '../../../ub-components/'

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
      <div className = {'educGrant-container'}>

        <div className = { 'educGrant-grid-column-2' }>
          <div></div>
          <div className = { 'educGrant-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educGrant-form-card-body '}>
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
                attachment ?
                <div>
                <EducationGrantAidFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachment }
                    setFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
                  />
                </div>
                :
                <div></div>
              }
              <br/>
              <Line/>

              <GenericButton
                type = { 'button' }
                text = { 'Continue' }
                onClick = {
                  () => onClick(true, grantId, grantType, grantAmount, file, imagePreviewUrl)
                }
                className = { 'educGrant-submit' } />
            </div>
          </div>
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
