import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/educationAidComponentStyle.css'

import EducationAidModal from '../modal/EducationAidModal'
import EducationAidReviewModal from '../modal/EducationAidReviewModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationAidFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      showModal: false,
      showReviewEducationModal: false,
      tuitionFeeText: '',
      registrationFeeText: '',
      totalFeeText: '',
      collegeType: '',
      schoolID: '',
      courseText: '',
      academicYearText: '',
      semesterText: '',
      totalReimbursableAmount: '',
      totalReimbursableAmountText: '',
      gwaText: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      imagePrevOR: null,
      imagePrevCOG: null,
      imagePrevRegForm: null,
      computations: ''
    }
    this.onGetClicked=this.onGetClicked.bind(this)
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  totalReimbursableAmount (computations, gwa, totalFee) {
    let result
    computations &&
    computations.map(
      (value, key) => {
        if (gwa >= value.minimum && gwa <= value.maximum) {
          result=parseFloat(totalFee) * parseFloat(value.percent)
        }
        else if (gwa <= value.minimum && gwa >= value.maximum) {
          result=parseFloat(totalFee) * parseFloat(value.percent)
        }
      }
    )
    return result ? parseFloat(result).toFixed(2) : 0.00

  }

  onGetClicked (
    courseText,
    academicYearText,
    semesterText,
    gwaText,
    tuitionFeeText,
    registrationFeeText,
    schoolID,
    fileOR,
    fileCOG,
    fileRegForm,
    imagePrevOR,
    imagePrevCOG,
    imagePrevRegForm,
    totalFeeText,
    totalReimbursableAmountText) {
      this.props.getFormData(
        courseText,
        academicYearText,
        semesterText,
        gwaText,
        tuitionFeeText,
        registrationFeeText,
        schoolID,
        fileOR,
        fileCOG,
        fileRegForm,
        imagePrevOR,
        imagePrevCOG,
        imagePrevRegForm,
        totalFeeText,
        totalReimbursableAmountText
      )
  }

  render () {
    const {
      educationAid,
      presenter,
      getFormData
    }=this.props

    const {
      showModal,
      showReviewEducationModal,
      tuitionFeeText,
      registrationFeeText,
      totalFeeText,
      collegeType,
      schoolID,
      courseText,
      academicYearText,
      semesterText,
      gwaText,
      totalReimbursableAmount,
      totalReimbursableAmountText,
      fileOR,
      fileCOG,
      fileRegForm,
      imagePrevOR,
      imagePrevCOG,
      imagePrevRegForm,
      computations
      }=this.state

    const resultTotalFee=tuitionFeeText && registrationFeeText ? parseFloat(tuitionFeeText) + parseFloat(registrationFeeText) : 0.00

    return (
      <div className={'educ-container'}>
        <div className={ 'educ-grid-column-2' }>
          {
            showModal &&
            <EducationAidModal
              tog={ educationAid.schools }
              presenter={ presenter }
              onSubmit={
                (schoolID, collegeType, computations) => {
                  this.setState({
                    schoolID,
                    collegeType,
                    computations
                  })
                }
              }
              onClose={
                () => {
                  this.setState({ showModal : false })
                }
              }
              />
            }
            {
              showReviewEducationModal &&
              <EducationAidReviewModal
                collegeType={ collegeType }
                tuitionFeeText={ tuitionFeeText }
                courseText={ courseText }
                registrationFeeText={ registrationFeeText }
                academicYearText={ academicYearText }
                semesterText={ semesterText }
                gwaText={ gwaText }
                totalFeeText={ totalFeeText }
                fileOR={ fileOR }
                fileCOG={ fileCOG }
                fileRegForm={ fileRegForm }
                imagePrevOR={ imagePrevOR }
                imagePrevCOG={ imagePrevCOG }
                imagePrevRegForm={ imagePrevRegForm }
                totalReimbursableAmountText={ totalReimbursableAmountText }
                onClose={ () => this.setState({ showReviewEducationModal : false }) }
                getFormData={ ()=> this.setState({
                  courseText,
                  academicYearText,
                  semesterText,
                  gwaText,
                  tuitionFeeText,
                  registrationFeeText,
                  schoolID,
                  fileOR,
                  fileCOG,
                  fileRegForm,
                  imagePrevOR,
                  imagePrevCOG,
                  imagePrevRegForm,
                  totalFeeText })}
                onClick={ () => this.onGetClicked(
                  courseText,
                  academicYearText,
                  semesterText,
                  gwaText,
                  tuitionFeeText,
                  registrationFeeText,
                  schoolID,
                  fileOR,
                  fileCOG,
                  fileRegForm,
                  imagePrevOR,
                  imagePrevCOG,
                  imagePrevRegForm,
                  totalFeeText
                  )
                }
              />
            }
            <div></div>
          <Card className={ 'educ-form-card' }>
            <h4>
              Benefits Details
            </h4>
            <div className={'educ-form-card-body '}>
            <GenericTextBox
              value={ tuitionFeeText ? tuitionFeeText : '' }
              onChange={
                (e) => {
                  const re=/^[0-9\.]+$/
                  if (e.target.value == '' ||  re.test(e.target.value)) {
                    this.setState({ tuitionFeeText: e.target.value })
                  }
               }
              }
              placeholder={ 'Tuition Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ registrationFeeText ? registrationFeeText : ''}
              onChange={
                (e) =>{
                  const re=/^[0-9\.]+$/
                  if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ registrationFeeText: e.target.value })
                  }
                }
               }
              placeholder={ 'Registration Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ resultTotalFee && parseFloat(resultTotalFee).toFixed(2) }
              disabled={ 'disabled' }
              placeholder={ 'Total Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ collegeType }
              onClick={
                () => this.setState({ showModal : true })
              }
              placeholder={ 'Colleges/Universities' }
              onChange={ (e) => this.setState({ collegeType : e.target.value }) }
              type={ 'button' }/>
            <GenericTextBox
              value={ courseText }
              onChange={ (e) => this.setState({ courseText: e.target.value }) }
              placeholder={ 'Course' }
              type={ 'text' }/>
            <GenericTextBox
              value={ academicYearText }
              onChange={ (e) => this.setState({ academicYearText: e.target.value }) }
              placeholder={ 'Academic Year' }
              type={ 'text' }/>
            <GenericTextBox
              value={ semesterText }
              onChange={ (e) =>  this.setState({ semesterText: e.target.value }) }
              placeholder={ 'Semester' }
              type={ 'text' }/>
            <GenericTextBox
              value={ gwaText }
              onChange={
                (e) =>{
                  const re=/^[0-9\.]+$/
                  if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ gwaText: e.target.value })
                  }
                }
               }
              placeholder={ 'General Weighted Average (GWA)' }
              type={ 'text' }/>
            <GenericTextBox
              value={ this.totalReimbursableAmount(computations, gwaText, resultTotalFee) }
              disabled={ 'disabled' }
              type={ 'text' }
              placeholder={ 'Total Reimbursable Amount' }/>
              <br/>
            <FileUploader
              accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
              value={ fileOR.name }
              placeholder={ 'Official Receipt of Tuition Fee' }
              onChange={
                (e) => {
                  e.preventDefault()
                  const reader=new FileReader()
                  const file=e.target.files[0]
                  let isValid
                  switch (this.getExtension(file.type).toLowerCase()) {
                    case 'jpeg' :
                      isValid=true
                    case 'jpg' :
                      isValid=true
                    case 'png' :
                      isValid=true
                    case 'pdf' :
                      isValid=true
                  }

                  if (isValid) {
                    reader.onloadend=() => {
                      this.setState({
                        fileOR: file,
                        imagePrevOR: reader.result
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
                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                value={ fileCOG.name }
                placeholder={ 'Certification of Grades' }
                onChange={
                  (e) => {
                    e.preventDefault()
                    const reader2=new FileReader()
                    const file2=e.target.files[0]
                    let isValid
                    switch (this.getExtension(file2.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid=true
                      case 'jpg' :
                        isValid=true
                      case 'png' :
                        isValid=true
                      case 'pdf' :
                        isValid=true
                    }

                    if (isValid) {
                      reader2.onloadend=() => {
                        this.setState({
                          fileCOG: file2,
                          imagePrevCOG : reader2.result
                        })
                      }
                      reader2.readAsDataURL(file2)
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
                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                value={ fileRegForm.name }
                placeholder={ 'Registration Form/Official Breakdown of Fees' }
                onChange={
                  (e) => {
                    e.preventDefault()
                    const reader3=new FileReader()
                    const file3=e.target.files[0]
                    let isValid
                    switch (this.getExtension(file3.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid=true
                      case 'jpg' :
                        isValid=true
                      case 'png' :
                        isValid=true
                      case 'pdf' :
                        isValid=true
                    }

                    if (isValid) {
                      reader3.onloadend=() => {
                        this.setState({
                          fileRegForm: file3,
                          imagePrevRegForm: reader3.result
                        })
                      }
                      reader3.readAsDataURL(file3)
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
                type={ 'button' }
                text={ 'submit' }
                onClick={ () => this.setState({ showReviewEducationModal : true }) }
                className={ 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationAidFormCardComponent
