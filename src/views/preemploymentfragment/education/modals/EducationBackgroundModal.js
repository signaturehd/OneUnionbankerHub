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

  getDamagePropertyObject () {
    getPropertyHolderFunc(educationObject)
  }

  render () {
    const {
    hideModalEducationFormFunc,
    updateMode,
    attachmentsData
    } = this.props

    return (
      <Modal
        onClose = { () => hideModalEducationFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        <h2>Education Background Form</h2>
        <GenericInput
          text = { 'School' }
          />
        <GenericInput
          text = { 'Student Number' }/>
        <GenericInput
          text = { 'Degree' }/>
        <GenericInput
          text = { 'Course' }/>
        <GenericInput
          text = { 'Special Honor' }/>
        <div className = { 'text-align-left' }>
          <h2>Inclusive Details</h2>
          <br/>
        </div>
        <GenericInput
          text = { 'Start Year' }
          type = { 'number' }
          maxLength = { 4 }/>
        <GenericInput
          text = { 'End Year' }
          type = { 'number' }
          maxLength = { 4 }/>
          <br/>
          <Line/>
          {
            attachmentsData.length !== 0  &&
            <div>
              <h4>
                <br/>
                Form Attachments
              </h4>
              <MultipleFileUploader
                placeholder = { '' }
                fileArray = { attachmentsData }
                setFile = { (resp) => setAttachmentDefaultyFunc(resp) }
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
                onClick={
                () => this.updateSelectedPropertyObject()
              }/> :
              <GenericButton
                text={ 'Add' }
                onClick={
                () => this.getDamagePropertyObject()
                }/>
            }
          </div>
      </Modal>
    )
  }
}

EducationBackgroundModal.propTypes = {
}
EducationBackgroundModal.defaultProps={
}

export default EducationBackgroundModal
