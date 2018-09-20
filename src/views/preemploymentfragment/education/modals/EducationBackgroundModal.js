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
    this.state = {
      count : 2,
      torFormData: [{
        name : 'Transcript of Records'
      }]
    }
  }

  getDamagePropertyObject () {
    getPropertyHolderFunc(educationObject)
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Transcript of Records ' + tempCount
    })
    this.setState({ torFormData : attachmentTemp })
  }

  render () {
    const {
    hideModalEducationFormFunc,
    updateMode
    } = this.props

    const {
    count,
    defaultSchool,
    torFormData
    } = this.state

    return (
      <Modal
        onClose = { () => hideModalEducationFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        <h2>Education Background Form</h2>
        <GenericInput
          text = { 'School' }/>
        <GenericInput
          text = { 'Student Number' }/>
        <GenericInput
          text = { 'Degree' }/>
        <GenericInput
          text = { 'Course' }/>
        <GenericInput
          text = { 'Term' }/>
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
          <br/>
          <div className = { 'grid-global' }>
            <h2></h2>
            <div className = { 'text-align-right' }>
              <GenericButton
                text = { 'Add Attachments' }
                onClick = { () => this.addAttachmentsFunc(torFormData, count) }
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
