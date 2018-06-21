import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/educationAidComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      collegeText: '',
      courseText: '',
      academicYearText: '',
      semesterText: '',
      typeOfGrantText: '',
      grantAmount: '',
      file: ''
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {

    const {
        collegeText,
        courseText,
        academicYearText,
        semesterText,
        typeOfGrantText,
        grantAmount,
        formAttachmentsText
      } = this.state

    return (
      <div className = {'educ-container'}>
        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
            <GenericTextBox
              value = { collegeText }
              onChange = { (e) => { this.setState({collegeText: e.target.value}) } }
              placeholder = { 'College/Universities' }
            type = { 'text' }/>
            <GenericTextBox
              value = { courseText }
              onChange = { (e) => { this.setState({courseText: e.target.value}) } }
              placeholder = { 'Course' }
            type = { 'text' }/>
            <GenericTextBox
              value = { academicYearText }
              onChange = { (e) => { this.setState({academicYearText: e.target.value}) } }
              placeholder = { 'Academic Year' }
            type = { 'text' }/>
            <GenericTextBox
              value = { semesterText }
              onChange = { (e) => { this.setState({semesterText: e.target.value}) } }
              placeholder = { 'Semester' }
            type = { 'text' }/>
            <GenericTextBox
              value = { typeOfGrantText }
              onChange = { (e) => { this.setState({typeOfGrantText: e.target.value}) } }
              placeholder = { 'Type of Grant' }
            type = { 'text' }/>
            <GenericTextBox
              value = { grantAmount }
              onChange = {
                (e) => {
                    const re = /^[0-9\.]+$/
                    if (e.target.value == '' ||  re.test(e.target.value)) {
                      this.setState({ grantAmount: e.target.value })
                    }
                 }
              }
              placeholder = { 'Grant Amount' }
            type = { 'text' }/>

              <br/>
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { this.state.file.name }
                placeholder = 'Form Attachments'
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
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId) }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationGrantAidFormCardComponent
