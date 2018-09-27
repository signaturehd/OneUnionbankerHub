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
import moment from 'moment'

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
      addressErrorMessage : '',
      position : '',
      positionErrorMessage : '',
      contactNo : '',
      contactNoErrorMessage : '',
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

  fromYearValidate(value) {
    if(value.length === 4) {
      if(value <= moment().format('YYYY')) {
        this.setState({ fromYearErrorMessage : '' })
      } else {
        this.setState({ fromYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ fromYearErrorMessage : 'Please input a valid year.' })
    }
  }

  toYearFunc(value) {
    this.setState({ toYear : value })
  }

  toYearValidate(value) {
    if(value.length === 4) {
      if(value <= moment().format('YYYY')) {
        this.setState({ toYearErrorMessage : '' })
      } else {
        this.setState({ toYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ toYearErrorMessage : 'Please input a valid year.' })
    }
  }

  briefDescDutiesFunc(value) {
    this.setState({ briefDescDuties : value })
  }

  validateRequired(value) {
    const validate = new RequiredValidation().isValid(value)
    return validate ? true : false
  }

  submission() {
    const {
      companyName,
      address,
      position,
      contactNo,
      fromMonthName,
      fromYear,
      toMonthName,
      toYear,
      briefDescDuties
    } = this.state

    if(!this.validateRequired(companyName)) {
      this.setState({ companyErrorMessage : 'Required field' })
    } else if(!this.validateRequired(address)) {
      this.setState({ addressErrorMessage : 'Required field' })
    } else if(!this.validateRequired(position)) {
      this.setState({ positionErrorMessage : 'Required field' })
    } else if(!this.validateRequired(contactNo)) {
      this.setState({ contactNoErrorMessage : 'Required field' })
    } else if(!this.validateRequired(fromMonthName)) {
      this.setState({ fromMonthErrorMessage : 'Required field' })
    } else if(!this.validateRequired(fromYear)) {
      this.setState({ fromYearErrorMessage : 'Required field' })
    } else if(!this.validateRequired(toMonthName)) {
      this.setState({ toMonthErrorMessage : 'Required field' })
    } else if(!this.validateRequired(toYear)) {
      this.setState({ toYearErrorMessage : 'Required field' })
    } else if(!this.validateRequired(briefDescDuties)) {
      this.setState({ briefErrorMessage : 'Required field' })
    } else {
      this.props.onSubmit(
        companyName,
        address,
        position,
        briefDescDuties,
        contactNo,
        fromMonthName,
        fromYear,
        toMonthName,
        toYear)
    }
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
          maxLength = { 30 }
          onChange = { (e) => this.companyFunc(e.target.value) }
          errorMessage = { companyErrorMessage }
          />
        <GenericInput
          text = { 'Address' }
          onChange = { (e) => this.addressFunc(e.target.value) }
          value = { address }
          maxLength = { 40 }
          errorMessage = { addressErrorMessage }
          />
        <GenericInput
          text = { 'Position' }
          onChange = { (e) => this.positionFunc(e.target.value) }
          value = { position }
          errorMessage = { positionErrorMessage }
          />
        <GenericInput
          text = { 'Contact Number' }
          value = { contactNo }
          maxLength = { 12 }
          onChange = { (e) => this.contactNoFunc(e.target.value) }
          type = { 'number' }
          errorMessage = { contactNoErrorMessage }
          />
        <h2 className = { 'text-align-left' }>Inclusive Dates</h2>
        <br/>
        <h2 className = { 'text-align-left font-size-12px' }>From Date:</h2>
        <div className = { 'grid-global' }>
          <GenericInput
            text = { 'Month' }
            onClick = { () => this.setState({ showFromMonthModal : true }) }
            value = { fromMonthName }
            errorMessage = { fromMonthErrorMessage }
          />
          <GenericInput
            text = { 'Year' }
            value = { fromYear }
            type = { 'number' }
            maxLength = { 4 }
            onChange = { (e) => {
              this.fromYearFunc(e.target.value)
              this.fromYearValidate(e.target.value)
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
            onClick = { () => this.setState({ showToMonthModal : true }) }
            errorMessage = { toMonthErrorMessage }
            />
          <GenericInput
            text = { 'Year' }
            value = { toYear }
            maxLength = { 4 }
            type = { 'number' }
            onChange = { (e) => {
                this.toYearFunc(e.target.value)
                this.toYearValidate(e.target.value)
              }
            }
            errorMessage = { toYearErrorMessage }
            />
        </div>
        <GenericInput
          text = { 'Brief Description of Duties' }
          value = { briefDescDuties }
          onChange = { (e) => this.briefDescDutiesFunc(e.target.value) }
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
                /> :
              <GenericButton
                text = { 'Add' }
                onClick = { () => {
                    this.submission()
                    onClose()
                  }
                }
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
