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
  Line
} from '../../../../ub-components/'

import './styles/calamityModalStyle.css'
import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'

import { RequiredValidation } from '../../../../utils/validate/'

class EducationBackgroundModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    return (
      <Modal
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
          <Line/>

        </div>
      </Modal>
    )
  }
}

EducationBackgroundModal.propTypes = {
}
EducationBackgroundModal.defaultProps={
}

export default CalamityFormGenericModal
