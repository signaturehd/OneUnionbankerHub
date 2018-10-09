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

import imageDefault from '../../../../images/profile-picture.png'

class WorkExperienceAddModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const {
      onClose,
      updateMode,
      monthData,
      fromMonthId,
      fromMonthName,
      fromMonthErrorMessage,
      toMonthId,
      toMonthName,
      toMonthErrorMessage,
      fromYear,
      fromYearErrorMessage,
      toYear,
      toYearErrorMessage,
      companyName,
      companyErrorMessage,
      address,
      addressErrorMessage,
      position,
      positionErrorMessage,
      contactNo,
      contactNoErrorMessage,
      briefDescDuties,
      briefDescDutiesErrorMessage,
      showFromMonthModal,
      showToMonthModal,
      companyFunc,
      addressFunc,
      positionFunc,
      contactNoFunc,
      fromYearFunc,
      fromYearValidate,
      toYearFunc,
      toYearValidate,
      briefDescDutiesFunc,
      submission,
      showFromMonthFunc,
      showToMonthFunc,
      fromMonthFunc,
      toMonthFunc
     } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }>
        {
          showFromMonthModal &&
          <SingleInputModal
            label = { 'Month' }
            inputArray = { monthData }
            selectedArray = { (fromMonthId, fromMonthName) =>
              fromMonthFunc(fromMonthId, fromMonthName)
            }
            onClose = { () => showFromMonthFunc(false) }
            />
        }
        {
          showToMonthModal &&
          <SingleInputModal
            label = { 'Month' }
            inputArray = { monthData }
            selectedArray = { (toMonthId, toMonthName) =>
              toMonthFunc(toMonthId, toMonthName)
            }
            onClose = { () => showToMonthFunc(false) }
            />
        }
        <h2>Work Experience</h2>
        <br/>
        <GenericInput
          text = { 'Company Name' }
          value = { companyName }
          maxLength = { 20 }
          onChange = { (e) => companyFunc(e.target.value) }
          errorMessage = { companyErrorMessage }
          />
        <GenericInput
          text = { 'Address' }
          onChange = { (e) => addressFunc(e.target.value) }
          value = { address }
          maxLength = { 35 }
          errorMessage = { addressErrorMessage }
          />
        <GenericInput
          text = { 'Position' }
          onChange = { (e) => positionFunc(e.target.value) }
          value = { position }
          errorMessage = { positionErrorMessage }
          />
        <GenericInput
          text = { 'Contact Number' }
          value = { contactNo }
          maxLength = { 12 }
          onChange = { (e) => contactNoFunc(e.target.value) }
          errorMessage = { contactNoErrorMessage }
          />
        <h2 className = { 'text-align-left' }>Inclusive Dates</h2>
        <br/>
        <h2 className = { 'text-align-left font-size-12px' }>From Date:</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'Month' }
            onClick = { () => showFromMonthFunc(true) }
            value = { fromMonthName }
            errorMessage = { fromMonthErrorMessage }
          />
          <GenericInput
            text = { 'Year' }
            value = { fromYear }
            maxLength = { 4 }
            onChange = { (e) => {
              fromYearFunc(e.target.value)
              fromYearValidate(e.target.value)
              }
            }
            errorMessage = { fromYearErrorMessage }
          />
        </div>
        <h2 className = { 'text-align-left font-size-12px' }>To Date:</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'Month' }
            value = { toMonthName }
            onClick = { () => showToMonthFunc(true) }
            errorMessage = { toMonthErrorMessage }
            />
          <GenericInput
            text = { 'Year' }
            value = { toYear }
            maxLength = { 4 }
            onChange = { (e) => {
                toYearFunc(e.target.value)
                toYearValidate(e.target.value)
              }
            }
            errorMessage = { toYearErrorMessage }
            />
        </div>
        <GenericInput
          text = { 'Brief Description of Duties' }
          value = { briefDescDuties }
          maxLength = { 35 }
          onChange = { (e) => briefDescDutiesFunc(e.target.value) }
          errorMessage = { briefDescDutiesErrorMessage }
          />
        <br/>
        <div className = { 'grid-global' }>
          <GenericButton
            text = { 'Cancel' }
            onClick = { () => onClose()  }
            />
            {
              updateMode ?
              <GenericButton
                text = { 'Update' }
                onClick = { () => submission() }
                /> :
              <GenericButton
                text = { 'Add' }
                onClick = { () => submission() }
                />
            }
          </div>
      </Modal>
    )
  }
}

WorkExperienceAddModal.propTypes = {
}
WorkExperienceAddModal.defaultProps={
}

export default WorkExperienceAddModal
