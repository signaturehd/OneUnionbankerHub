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
    this.state = {
      monthData :
      [{ id: 1, name: 'January' },
       { id: 2, name: 'February' },
       { id: 3, name: 'March' },
       { id: 4, name: 'April' },
       { id: 5, name: 'May' },
       { id: 6, name: 'June' },
       { id: 7, name: 'July' },
       { id: 8, name: 'August' },
       { id: 9, name: 'September' },
       { id: 10, name: 'October' },
       { id: 11, name: 'November' },
       { id: 12, name: 'December' }],
      fromMonthId : '',
      fromMonthName : '',
      fromMonthErrorMessage : '',
      toMonthId : '',
      toMonthName : '',
      toMonthErrorMessage : '',
      fromYear : '',
      fromYearErrorMessage : '',
      toYear : '',
      toYearErrorMessage : '',
      companyName : '',
      companyErrorMessage : '',
      address : '',
      position : '',
      contactNo : '',
      briefDescDuties : '',
      briefDescDutiesErrorMessage : '',
      showFromMonthModal : false,
      showToMonthModal : false
    }
  }

  companyFunc(value) {
    this.setState({ companyName : value })
  }

  addressFunc(value) {
    this.setState({ address : value })
  }

  positionFunc(value) {
    this.setState({ position : value })
  }

  contactNoFunc(value) {
    this.setState({ contactNo : value })
  }

  fromYearFunc(value) {
    this.setState({ fromYear : value })
  }

  toYearFunc(value) {
    value <= moment().format('year') &&
    this.setState({ toYear : value })
  }

  render () {
    const { onClose, updateMode } = this.props
    const {
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
       address,
       position,
       contactNo,
       briefDescDuties,
       briefDescDutiesErrorMessage,
       showFromMonthModal,
       showToMonthModal
     } = this.state

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
            selectedArray = { (fromMonthId, fromMonthName) => {
              this.setState({
                fromMonthId,
                fromMonthName,
                showFromMonthModal : false,
                monthErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showFromMonthModal : false }) }
            />
        }
        {
          showToMonthModal &&
          <SingleInputModal
            label = { 'Month' }
            inputArray = { monthData }
            selectedArray = { (toMonthId, toMonthName) => {
              this.setState({
                toMonthId,
                toMonthName,
                showToMonthModal : false,
                monthErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showToMonthModal : false }) }
            />
        }
        <h2>Work Experience</h2>
        <br/>
        <GenericInput
          text = { 'Company Name' }
          value = { companyName }
          onChange = { (e) => this.companyFunc(e.target.value) }
          />
        <GenericInput
          text = { 'Address' }
          onChange = { (e) => this.addressFunc(e.target.value) }
          value = { address }
          />
        <GenericInput
          text = { 'Position' }
          onChange = { (e) => this.positionFunc(e.target.value) }
          value = { position }
          />
        <GenericInput
          text = { 'Contact Number' }
          value = { contactNo }
          onChange = { (e) => this.contactNoFunc(e.target.value) }
          type = { 'number' }
          />
        <h2 className = { 'text-align-left' }>Inclusive Dates</h2>
        <br/>
        <h2 className = { 'text-align-left font-size-12px' }>From Date:</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'Month' }
            onClick = { () => this.setState({ showFromMonthModal : true }) }
            value = { fromMonthName }
          />
          <GenericInput
            text = { 'Year' }
            value = { fromYear }
            type = { 'number' }
            onChange = { (e) => this.fromYearFunc(e.target.value) }
          />
        </div>
        <h2 className = { 'text-align-left font-size-12px' }>To Date:</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'Month' }
            value = { toMonthName }
            onClick = { () => this.setState({ showToMonthModal : true }) }
            />
          <GenericInput
            text = { 'Year' }
            value = { toYear }
            type = { 'number' }
            onChange = { (e) => this.toYearFunc(e.target.value) }
            />
        </div>
        <GenericInput
          text = { 'Brief Description of Duties' }
          value = { briefDescDuties }
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

WorkExperienceAddModal.propTypes = {
}
WorkExperienceAddModal.defaultProps={
}

export default WorkExperienceAddModal
