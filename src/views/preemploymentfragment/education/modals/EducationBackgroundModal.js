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

import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'

import { RequiredValidation } from '../../../../utils/validate/'
import moment from 'moment'

class EducationBackgroundModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const {
    hideModalEducationFormFunc,
    updateMode,
    count,
    torFormData,
    addAttachmentsFunc,
    schoolName,
    studentNo,
    startYear,
    endYear,
    term,
    degree,
    honor,
    course,
    address
    } = this.props

    return (
      <Modal
        onClose = { () => hideModalEducationFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        <h2>Education Background Form</h2>
        <GenericInput
          text = { 'School' }
          maxLength = { 30 }
          value = { schoolName }/>
        <GenericInput
          text = { 'Student Number' }
          maxLength = { 24 }
          value = { studentNo }/>
        <GenericInput
          text = { 'Degree' }
          value = { degree }/>
        <GenericInput
          text = { 'Course' }
          value = { course }/>
        <GenericInput
          text = { 'Term' }
          value = { term }/>
        <GenericInput
          text = { 'Special Honor' }
          value = { honor }/>
        <div className = { 'text-align-left' }>
          <h2>Inclusive Details</h2>
          <br/>
        </div>
        <GenericInput
          text = { 'Start Year' }
          type = { 'number' }
          maxLength = { 4 }
          value = { startYear }/>
        <GenericInput
          text = { 'End Year' }
          type = { 'number' }
          maxLength = { 4 }
          value = { endYear }/>
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
                />
            }
          </div>
      </Modal>
    )
  }
}

EducationBackgroundModal.propTypes = {
  count : PropTypes.number,
  torFormData : PropTypes.array,
  addAttachmentsFunc : PropTypes.func,
  schoolName : PropTypes.string,
  studentNo : PropTypes.string,
  startYear : PropTypes.string,
  endYear : PropTypes.string,
  term : PropTypes.string,
  degree : PropTypes.string,
  honor : PropTypes.string,
  course : PropTypes.string,
  address : PropTypes.string,
}
EducationBackgroundModal.defaultProps={
}

export default EducationBackgroundModal
