import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import EducationGrantPersonalModal from '../modal/EducationGrantPersonalModal'

import './styles/educationComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationGrantAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showGrantTypes: false,
      grantType : '',
      grantAmount: '',
      attachment : 'Form Attachments',
      file: ''
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {

    const {
      grantAid,
      presenter
    } = this.props

    const {
      showGrantTypes,
      grantType,
      grantAmount,
      attachment,
      file
    } = this.state

    return (
      <div className = {'educ-container'}>

        {
          showGrantTypes &&
          <EducationGrantPersonalModal
            tog = { grantAid.grants }
            presenter = { presenter }
            onSubmit = {
              (grantType, grantAmount, attachment) => {
                this.setState({
                  grantType,
                  grantAmount,
                  attachment
                })
              }
            }
            onClose = {
              () => {
                this.setState({ showGrantTypes : false })
              }
            }
          />
        }

        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
            <GenericTextBox
              value = { grantAid.college }
              onChange = {() => {}}
              placeholder = { 'College/Universities' }
              type = { 'text' }/>
            <GenericTextBox
              value = { grantAid.course }
              onChange = {() => {}}
              placeholder = { 'Course' }
              type = { 'text' }/>
            <GenericTextBox
              value = { grantAid.academicYear }
              onChange = {() => {}}
              placeholder = { 'Academic Year' }
              type = { 'text' }/>
            <GenericTextBox
              value = { grantAid.semester }
              onChange = {() => {}}
              placeholder = { 'Semester' }
              type = { 'text' }/>
            <GenericTextBox
              value = { grantType }
              onClick = {
                () => {
                  this.setState({ showGrantTypes : true })
                }
              }
              placeholder = { 'Type of Grant' }
              type = { 'text' }/>
            <GenericTextBox
              value = { grantAmount }
              onChange = {() => {}}
              placeholder = { 'Grant Amount' }
              type = { 'text' }/>
              <br/>
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { file.name }
                placeholder = { attachment }
                onChange = {
                  (e) => {
                    e.preventDefault()
                    const reader = new FileReader()
                    const file = e.target.files[0]
                    let isValid
                    switch (this.getExtension(file.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid = true
                      case 'jpg' :
                        isValid = true
                      case 'png' :
                        isValid = true
                      case 'pdf' :
                        isValid = true
                    }

                    if (isValid) {
                      reader.onloadend = () => {
                        this.setState({
                          file
                        })
                      }
                      reader.readAsDataURL(file)
                   } else {
                       store.dispatch(NotifyActions.addNotify({
                           title : 'File Uploading',
                           message : 'The accepted attachments are JPG/PNG/PDF',
                           type : 'warning',
                           duration : 2000
                         })
                       )
                     }
                  }
                }
              />
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => {} }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationGrantAidFormCardComponent
