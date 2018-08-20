import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  GenericButton,
  MultipleFileUploader,
  DatePicker,
  Line,
  Modal } from '../../../ub-components/'

import './styles/educationAidComponentStyle.css'

import EducationAidModal from '../modal/EducationAidModal'
import EducationAidReviewModal from '../modal/EducationAidReviewModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import moment from 'moment'

import { MoneyValidation, RequiredDecimalValidation, RequiredAlphabetValidation } from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

class EducationAidFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.onGetClicked=this.onGetClicked.bind(this)
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  totalReimbursableAmount (computations, gwa, totalFee) {
    if (computations) {
      for (const i in computations) {
        if ((gwa >= computations[i].maximum && gwa <= computations[i].minimum) ||
            (gwa >= computations[i].minimum && gwa <= computations[i].maximum)) {
          return parseFloat(totalFee) * parseFloat(computations[i].percent)
        }
      }
    } else {
      return 0
    }
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
      onClick,
      presenter,
      tuitionFeeText,
      tuitionFeeFunc,
      tuitionFeeErrorMessage,
      registrationFeeText,
      registrationFeeFunc,
      registrationFeeErrorMessage,
      totalFeeText,
      schoolName,
      schoolErrorMessage,
      computations,
      showSchoolsFunc,
      courseText,
      courseTextFunc,
      courseTextErrorMessage,
      academicYearText,
      showAcademicYearFunc,
      academicYearTextErrorMessage,
      semesterText,
      semesterErrorMessage,
      showSemesterFunc,
      gwaText,
      gwaErrorMessage,
      gwaFunc,
      totalReimbursment,
      attachmentsData,
      showEditSubmitButton,
      showFormReview,
      onSubmitFunc,
      editFormDataFunc,
      setAttachmentArrayFunc
    }=this.props

console.log(attachmentsData)
    return (
      <div className={'educ-container'}>
        <div className={ 'educ-grid-column-2' }>
            <div></div>
          <div className={ 'educaid-form-card' }>
            <div className={'educ-form-card-body '}>
            <GenericInput
              value={ tuitionFeeText }
              onChange={ (e) => tuitionFeeFunc(e.target.value) }
              text={ 'Tuition Fee' }
              errorMessage = { tuitionFeeErrorMessage }
              disabled = { showEditSubmitButton }
              type={ 'text' }/>
            <GenericInput
              value={ registrationFeeText ? registrationFeeText : ''}
              onChange={ (e) => registrationFeeFunc(e.target.value) }
              text={ 'Registration Fee' }
              disabled = { showEditSubmitButton }
              errorMessage = { registrationFeeErrorMessage }
              type={ 'text' }/>
            <GenericInput
              value={ totalFeeText && parseFloat(totalFeeText).toFixed(2) }
              disabled={ 'disabled' }
              text={ 'Total Fee' }
              type={ 'text' }/>
            <GenericInput
              value={ schoolName }
              onClick={ () => showSchoolsFunc() }
              text={ 'Colleges/Universities' }
              disabled = { showEditSubmitButton }
              errorMessage = { schoolErrorMessage }
              type={ 'text' }/>
            <GenericInput
              value={ courseText }
              onChange={ (e) => courseTextFunc(e.target.value) }
              errorMessage = { courseTextErrorMessage }
              disabled = { showEditSubmitButton }
              text={ 'Course' }
              type={ 'text' }/>
            <GenericInput
              value={ academicYearText }
              onClick={ () => showAcademicYearFunc() }
              text={ 'Academic Year' }
              disabled = { showEditSubmitButton }
              errorMessage = { academicYearTextErrorMessage }
              type={ 'text' }/>
            <GenericInput
              value={ semesterText }
              onClick={ () => showSemesterFunc() }
              disabled = { showEditSubmitButton }
              errorMessage = { semesterErrorMessage }
              text={ 'Semester' }
              type={ 'text' }/>
            <GenericInput
              value={ gwaText }
              onChange={ (e) => gwaFunc(e.target.value) }
              disabled = { showEditSubmitButton }
              maxLength = { 4 }
              errorMessage = { ((parseInt(totalReimbursment) ===0) && gwaText) ? 'Invalid GWA' : gwaErrorMessage }
              text={ 'General Weighted Average (GWA)' }
              type={ 'text' }/>
            <GenericInput
              value={ totalReimbursment }
              disabled={ 'disabled' }
              type={ 'text' }
              text={ 'Total Reimbursable Amount' }/>

              {
                attachmentsData.length !== 0  ?
                <div>
                <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentsData }
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

              {
                showEditSubmitButton ?
                <div className = { 'educ-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    className = { 'educ-edit-form' }
                    onClick = { () =>
                      editFormDataFunc()
                      }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFunc() }
                    className = { 'educ-submit-form-button' }
                    />
                </div>
                :
                  <GenericButton
                    type = { 'button' }
                    text = { 'Continue' }
                    onClick = {
                      () => showFormReview(true)
                    }
                    className = { 'educ-submit' } />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EducationAidFormCardComponent.propTypes = {
  tuitionFeeText : PropTypes.string,
  tuitionFeeErrorMessage : PropTypes.string,
  tuitionFeeFunc : PropTypes.func,
  registrationFeeText : PropTypes.string,
  registrationFeeErrorMessage : PropTypes.string,
  registrationFeeFunc : PropTypes.func,
  totalFeeText : PropTypes.number,
  schoolName : PropTypes.string,
  showSchoolsFunc : PropTypes.func,
  schoolErrorMessage : PropTypes.string,
  courseText : PropTypes.string,
  courseTextFunc : PropTypes.func,
  courseTextErrorMessage : PropTypes.string,
  academicYearText : PropTypes.string,
  academicYearTextErrorMessage : PropTypes.string,
  showAcademicYearFunc : PropTypes.func,
  semesterText : PropTypes.string,
  showSemesterFunc : PropTypes.func,
  semesterErrorMessage : PropTypes.string,
  gwaText : PropTypes.string,
  gwaErrorMessage : PropTypes.string,
  gwaFunc : PropTypes.func,
  totalReimbursment : PropTypes.string,
  showEditSubmitButton : PropTypes.bool,
  showFormReview : PropTypes.func,
  setAttachmentArrayFunc : PropTypes.func,
  onSubmitFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func
}

export default EducationAidFormCardComponent
