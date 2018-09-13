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

import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'

import { RequiredValidation } from '../../../../utils/validate/'

class WorkExperienceAddModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const { onClose } = this.props
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }>
        <h2>Work Experience Form</h2>
        <br/>
        <GenericInput
          text = { 'Company Name' }
          />
        <GenericInput
          text = { 'Address' }/>
        <GenericInput
          text = { 'Position' }/>
        <GenericInput
          text = { 'Date Employment' }/>
        <GenericInput
          text = { 'Contact Number' }/>
        <br/>

        <GenericButton
          text = { 'Save' }
          className = { 'global-button' }
          onClick = { () => {} }
          />
      </Modal>
    )
  }
}

WorkExperienceAddModal.propTypes = {
}
WorkExperienceAddModal.defaultProps={
}

export default WorkExperienceAddModal
