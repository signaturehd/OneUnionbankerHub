import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleAttachments,
  GenericInput,
  SingleInputModal,
  Line,
  DatePicker
} from '../../../../ub-components/'

import SchoolModal from './SchoolModal'

import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'

import { RequiredValidation } from '../../../../utils/validate/'
import moment from 'moment'

import PreEmploymentViewAttachmentsComponent from '../../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../../preemployment/modals/ViewAttachmentModal'

class EducationBackgroundModal extends Component {

  constructor (props) {
    super (props)
  }

  checkDegree (id) {
    if(id === 0) {
      return 'Bachelors'
    } else if (id === 1) {
      return 'Masteral'
    } else if (id === 2) {
      return 'Doctorate'
    } else if (id === 3) {
      return 'Vocational'
    }
  }

  checkDegreeText (id) {
    console.log(id)
    if(id.toLowerCase() === 'bachelors') {
      return 'Bachelors'
    } else if (id.toLowerCase() === 'masteral') {
      return 'Masteral'
    } else if (id.toLowerCase() === 'doctorate') {
      return 'Doctorate'
    } else if (id.toLowerCase() === 'vocational') {
      return 'Vocational'
    }
  }

  render () {

    const degreeArray = [
      { id:0, name:'Bachelors' },
      { id:1, name:'Masteral' },
      { id:2, name:'Doctorate' },
      { id:3, name:'Vocational' }
    ]

    const {
      attachmentUrl,
      viewFile,
      viewFileFunc,
      onClose,
      enabledAttachmentLoader,
      showViewModal,
      hideModalEducationFormFunc,
      enabledLoader,
      updateMode,
      count,
      schools,
      schoolPageNumber,
      schoolViewMore,
      nextSchoolPageNumberFunc,
      previousSchoolPageNumberFunc,
      schoolFindFunc,
      torFormData,
      addAttachmentsFunc,
      setSchoolFunc,
      onCloseModal,
      showSchoolsFunc,
      showSchoolsModal,
      schoolId,
      schoolName,
      studentNo,
      startYear,
      endYear,
      term,
      showDegreeModal,
      showDegreeFunc,
      setDegreeFunc,
      degree,
      honor,
      course,
      address,
      studentNoFunc,
      termFunc,
      addressFunc,
      degreeFunc,
      courseFunc,
      honorFunc,
      startYearFunc,
      startYearValidate,
      endYearFunc,
      endYearValidate,
      submissionFunc,
      schoolNameErrorMessage,
      studentNoErrorMessage,
      addressErrorMessage,
      degreeErrorMessage,
      courseErrorMessage,
      termErrorMessage,
      honorErrorMessage,
      startYearErrorMessage,
      endYearErrorMessage,
      degreeId
    } = this.props

    return (
      <Modal
        onClose = { () => hideModalEducationFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        <div>
        {
          showSchoolsModal &&
          <SchoolModal
            enabledLoader = { enabledLoader }
            label = { 'School' }
            schoolPageNumber = { schoolPageNumber }
            schoolViewMore = { schoolViewMore }
            nextSchoolPageNumberFunc = { () => nextSchoolPageNumberFunc() }
            previousSchoolPageNumberFunc = { () => previousSchoolPageNumberFunc() }
            schoolFindFunc = { (resp) => schoolFindFunc (resp) }
            inputArray = { schools }
            selectedArray = { (schoolId, schoolName) =>
              setSchoolFunc(schoolId, schoolName)
            }
            onClose = { () => onCloseModal() }
            />
        }
        {
          showViewModal &&
          <ViewAttachmentModal
            file = { viewFile }
            onClose = { () => onClose() }
          />
        }
        {
          showDegreeModal &&
          <SingleInputModal
            label = { 'Degree' }
            inputArray = { degreeArray }
            selectedArray = { (degreeId,degreeName) =>
              degreeFunc(degreeId,degreeName)
            }
            onClose = { () => showDegreeFunc(false) }
          />
        }
        <h2>Education Background Form</h2>
        <GenericInput
          text = { 'School' }
          value = { schoolName }
          maxLength = { 25 }
          readOnly
          onClick = { () => showSchoolsFunc() }
          errorMessage = { schoolNameErrorMessage }/>
        <GenericInput
          text = { 'School Address' }
          maxLength = { 30 }
          value = { address }
          onChange = { (e) => addressFunc(e.target.value) }
          errorMessage = { addressErrorMessage }/>
        <GenericInput
          text = { 'Student Number' }
          maxLength = { 24 }
          value = { studentNo }
          onChange = { (e) => studentNoFunc(e.target.value) }
          errorMessage = { studentNoErrorMessage }/>
        <GenericInput
          text = { 'Degree' }
          value = { this.checkDegreeText(degree) }
          readOnly
          onChange = { (e) => degreeFunc(e.target.value) }
          onClick = { () => showDegreeFunc(true) }
          errorMessage = { degreeErrorMessage }/>
        <GenericInput
          text = { 'Course' }
          value = { course }
          maxLength = { 25 }
          onChange = { (e) => courseFunc(e.target.value) }
          errorMessage = { courseErrorMessage }/>
        <GenericInput
          text = { 'Special Honor' }
          value = { honor }
          onChange = { (e) => honorFunc(e.target.value) }
          errorMessage = { honorErrorMessage }/>
        <div className = { 'text-align-left' }>
          <h2>Inclusive Details</h2>
          <br/>
        </div>
        <GenericInput
          text = { 'Start Year' }
          type = { 'number' }
          maxLength = { 4 }
          value = { startYear }
          onChange = { (e) => {
              startYearFunc(e.target.value)
              startYearValidate(e.target.value)
            }
          }
          errorMessage = { startYearErrorMessage }
        />
        <GenericInput
          text = { 'End Year' }
          value = { endYear }
          type = { 'number' }
          maxLength = { 4 }
          onChange = { (e) => {
              endYearFunc(e.target.value)
              endYearValidate(e.target.value)
            }
          }
          errorMessage = { endYearErrorMessage }
          />
          <br/>
          <Line/>
          {
              enabledAttachmentLoader ?
              <center>
                <br/>
                <h2>Please wait while we we&#39;re retrieving your documents </h2>
                <br/>
                <CircularLoader show = { enabledAttachmentLoader } />
                <br/>
              </center>
              :
            <div>
              <div>
                <PreEmploymentViewAttachmentsComponent
                  title = { 'TOR' }
                  file = { attachmentUrl }
                  onClick = { (viewFile) => viewFileFunc(viewFile) }/>
              </div>
              <br/>
              <div className = { 'grid-global' }>
                <h2></h2>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => addAttachmentsFunc(torFormData, count) }
                    />
                </div>
              </div>
              {
                torFormData.length !== 0  &&
                <div>
                <h4>
                  <br/>
                  Form Attachments
                </h4>
                <MultipleAttachments
                  count = { count }
                  countFunc = { (count) => this.setState({ count }) }
                  placeholder = { '' }
                  fileArray = { torFormData }
                  setFile = { (torFormData) =>
                      this.setState({ torFormData })
                  }
                  />
                </div>
               }
            <div className = { 'grid-global' }>
              <GenericButton
              text = { 'Cancel' }
              onClick = { () => hideModalEducationFormFunc(false)  }
              />
              {
                updateMode ?
                <GenericButton
                  text={ 'Update' }
                  onClick = { () => submissionFunc() }
                  /> :
                <GenericButton
                  text={ 'Add' }
                  onClick = { () => submissionFunc() }
                  />
              }
            </div>
          </div>
          }
        </div>
      </Modal>
    )
  }
}

EducationBackgroundModal.propTypes = {
  count : PropTypes.number,
  torFormData : PropTypes.array,
  schools : PropTypes.array,
  onCloseModal : PropTypes.func,
  setSchoolFunc : PropTypes.func,
  addAttachmentsFunc : PropTypes.func,
  showSchoolsFunc : PropTypes.func,
  showSchoolsModal : PropTypes.bool,
  schoolId : PropTypes.string,
  schoolName : PropTypes.string,
  studentNo : PropTypes.string,
  startYear : PropTypes.string,
  endYear : PropTypes.string,
  term : PropTypes.string,
  degree : PropTypes.string,
  honor : PropTypes.string,
  course : PropTypes.string,
  address : PropTypes.string,
  schoolNameErrorMessage : PropTypes.string,
  studentNoErrorMessage : PropTypes.string,
  addressErrorMessage : PropTypes.string,
  degreeErrorMessage : PropTypes.string,
  courseErrorMessage : PropTypes.string,
  termErrorMessage : PropTypes.string,
  honorErrorMessage : PropTypes.string,
  schoolPageNumber : PropTypes.number,
  schoolViewMore : PropTypes.string,
  nextSchoolPageNumberFunc : PropTypes.func,
  previousSchoolPageNumberFunc : PropTypes.func,
  schoolFindFunc : PropTypes.func,
  studentNoFunc : PropTypes.func,
  termFunc : PropTypes.func,
  addressFunc : PropTypes.func,
  degreeFunc : PropTypes.func,
  courseFunc : PropTypes.func,
  honorFunc : PropTypes.func,
  submissionFunc : PropTypes.func
}
EducationBackgroundModal.defaultProps={
}

export default EducationBackgroundModal
