import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/educationAidComponentStyle.css'
import EducationAidModal from '../modal/EducationAidModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showModal: false,
      tuitionFeeText: '',
      registrationFeeText: '',
      totalFeeText: '',
      collegeType: '',
      courseText: '',
      academicYearText: '',
      semesterText: '',
      totalReimbursableAmount: '',
      gwaText: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      computations: ''
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  totalReimbursableAmount (computations, gwa, totalFee) {
    let result
    computations &&
    computations.map(
      (value, key) => {
        if (gwa >= value.minimum && gwa <= value.maximum) {
          result = totalFee * value.percent
        }
      }
    )
    return result
  }

  render () {
    const {
      educationAid,
      presenter
    } = this.props

    const {
      showModal,
      tuitionFeeText,
      registrationFeeText,
      totalFeeText,
      collegeType,
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      totalReimbursableAmount,
      fileOR,
      fileCOG,
      fileRegForm,
      computations
      } = this.state

    const resultTotalFee = tuitionFeeText && registrationFeeText ? tuitionFeeText + registrationFeeText : ''

    return (
      <div className = {'educ-container'}>
        <div className = { 'educ-grid-column-2' }>
              {  showModal &&
                <EducationAidModal
                tog = { educationAid.schools }
                presenter = { presenter }
                onSubmit = {
                  (collegeType, computations) => {
                    this.setState({
                      collegeType,
                      computations
                    })
                  }
                }
                onClose = {
                  () => {
                    this.setState({ showModal : false })
                  }
                }
                />
              }
            <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Details
            </h4>
            <div className = {'educ-form-card-body '}>
            <GenericTextBox
              value = { tuitionFeeText ? tuitionFeeText : '' }
              onChange = {
                (e) => {
                  const re = /^[0-9\.]+$/
                  if (e.target.value == '' ||  re.test(e.target.value)) {
                    this.setState({ tuitionFeeText: parseInt(e.target.value) })
                  }
               }
              }
              placeholder = { 'Tuition Fee' }
            type = { 'text' }/>
            <GenericTextBox
              value = { registrationFeeText ? registrationFeeText : ''}
              onChange = {
                (e) =>{
                  const re = /^[0-9\.]+$/
                  if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({registrationFeeText: parseInt(e.target.value) })
                  }
                }
               }
              placeholder = { 'Registration Fee' }
            type = { 'text' }/>
            <GenericTextBox
              value = { resultTotalFee }
              disabled = { 'disabled' }
            type = { 'text' }/>
            <GenericTextBox
              value = { collegeType }
              onClick = {
                () => this.setState({ showModal : true })
              }
              placeholder = { 'Colleges/Universities' }
            type = { 'text' }/>
            <GenericTextBox
              value = { courseText }
              onChange = { (e) => this.setState({courseText: e.target.value}) }
              placeholder = { 'Course' }
            type = { 'text' }/>
            <GenericTextBox
              value = { academicYearText }
              onChange = { (e) => this.setState({academicYearText: e.target.value}) }
              placeholder = { 'Academic Year' }
            type = { 'text' }/>
            <GenericTextBox
              value = { semesterText }
              onChange = { (e) =>  this.setState({semesterText: e.target.value}) }
              placeholder = { 'Semester' }
            type = { 'text' }/>
            <GenericTextBox
              value = { gwaText }
              onChange = { (e) => {
                this.setState({gwaText: e.target.value})
              }
             }
              placeholder = { 'General Weighted Average (GWA)' }
            type = { 'text' }/>
            <GenericTextBox
              value = { this.totalReimbursableAmount(computations, gwaText, resultTotalFee) }
              disabled = { 'disabled' }
            type = { 'text' }/>

              <br/>
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { this.state.fileOR.name }
                placeholder = 'Official Receipt of Tuition Fee'
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
                          fileOR: file
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
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { this.state.fileCOG.name }
                placeholder = 'Certification of Grades'
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
                          fileCOG: file
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
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { this.state.fileRegForm.name }
                placeholder = 'Registration Form/Official Breakdown of F...'
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
                          fileRegForm: file
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
                onClick = { () => this.sendFormData(tuitionFeeText, registrationFeeText, totalFeeText, collegeText,
                  courseText, academicYearText, semesterText, gwaText, totalReimbursableAmount, fileOR, fileCOG, fileRegForm) }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationAidFormCardComponent
