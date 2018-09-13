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
        <h2>Work Experience</h2>
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
        <h2 className = { 'text-align-left' }>Inclusive Dates</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'From Year' }
            />
          <GenericInput
            text = { 'To Year' }
            />
        </div>
        <GenericInput
          text = { 'Brief Description of Duties' }
          />
        <br/>
        <GenericButton
          text = { 'Add' }
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
