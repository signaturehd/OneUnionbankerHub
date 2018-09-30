import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

import {
  Modal,
  GenericButton,
  MultipleFileUploader,
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

class EducationBackgroundModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {

    const degreeArray = [
      { id:1, name:'Bachelors' },
      { id:2, name:'Masteral' },
      { id:3, name:'Doctorate' },
      { id:4, name:'Vocational' }
    ]

    const {
    hideModalEducationFormFunc,
    updateMode,
    count,
    schools,
    schoolPageNumber,
    schoolViewMore,
    schoolPageNumberFunc,
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
    startYearErrorMessage,
    endYearFunc,
    endYearValidate,
    endYearErrorMessage,
    submission
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
            label = { 'School' }
            schoolViewMore = { schoolViewMore }
            schoolPageNumberFunc = { () => schoolPageNumberFunc() }
            inputArray = { schools }
            selectedArray = { (schoolId, schoolName) => setSchoolFunc(schoolId, schoolName) }
            onClose = { () => onCloseModal() }
            />
        }
        {
          showDegreeModal &&
          <SingleInputModal
            label = { 'Degree' }
            inputArray = { degreeArray }
            selectedArray = { (degreeId,degreeName) => degreeFunc(degreeId,degreeName) }
            onClose = { () => showDegreeFunc(false) }
          />
        }
        <h2>Education Background Form</h2>
        <GenericInput
          text = { 'School' }
          value = { schoolName }
          onClick = { () => showSchoolsFunc() }/>
        <GenericInput
          text = { 'School Address' }
          value = { address }
          onChange = { (e) => addressFunc(e.target.value) }
        />
        <GenericInput
          text = { 'Student Number' }
          maxLength = { 24 }
          value = { studentNo }
          onChange = { (e) => studentNoFunc(e.target.value) }
          />
        <GenericInput
          text = { 'Degree' }
          value = { degree }
          onChange = { (e) => degreeFunc(e.target.value) }
          onClick = { () => showDegreeFunc(true) }
          />
        <GenericInput
          text = { 'Course' }
          value = { course }
          onChange = { (e) => courseFunc(e.target.value) }
          />
        <GenericInput
          text = { 'Term' }
          value = { term }
          onChange = { (e) => termFunc(e.target.value) }
          />
        <GenericInput
          text = { 'Special Honor' }
          value = { honor }
          onChange = { (e) => honorFunc(e.target.value) }
          />
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
          type = { 'number' }
          maxLength = { 4 }
          value = { endYear }
          onChange = { (e) => {
              endYearFunc(e.target.value)
              endYearValidate(e.target.value)
            }
          }
          errorMessage = { endYearErrorMessage }
          />
          <br/>
          <Line/>
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
                /> :
              <GenericButton
                text={ 'Add' }
                onClick = { () => submission() }
                />
            }
          </div>
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
  schoolPageNumber : PropTypes.number,
  schoolViewMore : PropTypes.string,
  schoolPageNumberFunc : PropTypes.func,
  studentNoFunc : PropTypes.func,
  termFunc : PropTypes.func,
  addressFunc : PropTypes.func,
  degreeFunc : PropTypes.func,
  courseFunc : PropTypes.func,
  honorFunc : PropTypes.func,
  submission : PropTypes.func
}
EducationBackgroundModal.defaultProps={
}

export default EducationBackgroundModal
