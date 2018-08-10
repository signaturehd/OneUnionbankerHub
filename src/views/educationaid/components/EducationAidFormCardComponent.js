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
    this.state={
      showReviewEducationModal: false,
      totalReimbursableAmount: '',
      totalReimbursableAmountText: '',
      gwaText: '',
      showEducationSemesterModal: false,
      showEducationAcademicYearModal : false
    }
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
      registrationErrorMessage,
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
      attachmentsData,
      showEditSubmitButton
    }=this.props

    const {
      showReviewEducationModal,
      totalReimbursableAmount,
      totalReimbursableAmountText,
      showEducationSemesterModal,
      showEducationAcademicYearModal,
      }=this.state

    const totalReimbursment = format(this.totalReimbursableAmount(computations, gwaText, totalFeeText))

    return (
      <div className={'educ-container'}>
        <div className={ 'educ-grid-column-2' }>

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
            {
              showEducationSemesterModal &&
              <Modal
                isDismisable={ true }
                onClose={ ()=> this.setState({ showEducationSemesterModal: false }) }
                >
                <div>
                  {
                    semesterOptions && semesterOptions.map((semester, key) =>
                      <GenericButton
                        className = { 'mpl-poa-modal-button' }
                        key={ key }
                        text={ semester.name }
                        onClick={ () => {
                          this.setState({ semesterText: semester.name, showEducationSemesterModal: false })
                          }
                        }
                      />
                    )
                  }
                </div>
              </Modal>
            }

            {
              showEducationAcademicYearModal &&
              <Modal
                isDismisable={ true }
                onClose={ ()=> this.setState({ showEducationAcademicYearModal: false }) }
                >
                <div>
                  {
                    AcademicYearOptions && AcademicYearOptions.map((academicYear, key) =>
                      <GenericButton
                        className = { 'mpl-poa-modal-button' }
                        key={ key }
                        text={ academicYear.name }
                        onClick={ () => {
                          this.setState({ academicYearText: academicYear.name, showEducationAcademicYearModal: false })
                          }
                        }
                      />
                    )
                  }
                </div>
              </Modal>
            }

            <div></div>
          <div className={ 'educaid-form-card' }>
            <div className={'educ-form-card-body '}>
            <GenericInput
              value={ tuitionFeeText }
              onChange={ (e) => tuitionFeeFunc(e.target.value) }
              text={ 'Tuition Fee' }
              errorMessage = { tuitionFeeErrorMessage }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ registrationFeeText ? registrationFeeText : ''}
              onChange={ (e) => registrationFeeFunc(e.target.value) }
              text={ 'Registration Fee' }
              errorMessage = { registrationErrorMessage }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ totalFeeText && parseFloat(totalFeeText).toFixed(2) }
              disabled={ 'disabled' }
              text={ 'Total Fee' }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ schoolName }
              onClick={ () => showSchoolsFunc() }
              text={ 'Colleges/Universities' }
              errorMessage = { schoolErrorMessage }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ courseText }
              onChange={ (e) => courseTextFunc(e.target.value) }
              errorMessage = { courseTextErrorMessage }
              text={ 'Course' }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ academicYearText }
              onClick={ () => showAcademicYearFunc() }
              text={ 'Academic Year' }
              errorMessage = { academicYearTextErrorMessage }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ semesterText }
              onClick={ () => showSemesterFunc() }
              text={ 'Semester' }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ gwaText }
              onChange={ (e) => gwaFunc(e.target.value) }
              maxLength = { 4 }
              errorMessage = { ((parseInt(totalReimbursment) ===0) && gwaText) ? 'Invalid GWA' : '' }
              text={ 'General Weighted Average (GWA)' }
              type={ 'text' }/>
              <br/>
            <GenericInput
              value={ totalReimbursment }
              disabled={ 'disabled' }
              type={ 'text' }
              text={ 'Total Reimbursable Amount' }/>
              <br/>

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
              <br/>

              <GenericButton
                type={ 'button' }
                text={ 'submit' }
                onClick={
                  () => onClick(true,
                    {
                      tuitionFeeText,
                      registrationFeeText,
                      resultTotalFee,
                      schoolID,
                      collegeType,
                      courseText,
                      academicYearText,
                      semesterText,
                      gwaText,
                      totalReimbursment,
                      fileOR,
                      fileCOG,
                      fileRegForm,
                      imagePrevOR,
                      imagePrevCOG,
                      imagePrevRegForm
                    }
                  )
                }
                className={ 'educ-submit' } />
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
  registrationErrorMessage : PropTypes.string,
  registrationFeeFunc : PropTypes.func,
  totalFeeText : PropTypes.string,
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
  gwaErrorMessage : PropTypes.toString,
  gwaFunc : PropTypes.func,
  showEditSubmitButton : PropTypes.bool
}

export default EducationAidFormCardComponent
