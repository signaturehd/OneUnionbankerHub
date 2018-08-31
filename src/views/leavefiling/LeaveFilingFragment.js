import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/LeaveFilingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  GenericInput,
  Card,
  GenericButton,
  DatePicker,
  TimePickerComponent,
  CircularLoader,
  Modal
} from '../../ub-components/'

import {
  RequiredValidation
} from '../../utils/validate/'

import * as LeaveFilingFunctions from './functions/LeaveFilingFunctions'

import moment from 'moment'
import './styles/leaveFilingStyle.css'

class LeaveFilingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      feedbackTextareaValueRemarks: '',
      enabledLoader : false,
      showSuccessModal : false,
      showEditMode : false,
      successMessage: '',
      dateTo: '',
      dateFrom: '',
      errorMessageRemarks : '',
      errorMessageRemarksDateFrom : '',
      errorMessageRemarksDateTo : '',
      errorMessageRemarksTimeFrom : '',
      errorMessageRemarksTimeTo : '',
      fromTime : '',
      fromMeridiem : '',
      toTime : '',
      toMeridiem : ''
    }
    this.fromTimeChange = this.fromTimeChange.bind(this);
    this.toTimeChange = this.toTimeChange.bind(this);
  }

  fromTimeChange(options) {
    const {
      hour,
      minute,
      meridiem
    } = options

    this.setState({ fromTime: `${hour}:${minute}`, fromMeridiem: meridiem })
  }

  toTimeChange(options) {
    const {
      hour,
      minute,
      meridiem
    } = options

    this.setState({ toTime: `${hour}:${minute}`, toMeridiem: meridiem })
  }

  getTextareaValueRemarks (e) {
    this.setState({ feedbackTextareaValueRemarks: e })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showSuccessResponse (successMessage) {
    this.setState({ successMessage, showSuccessModal : true })
  }

  checkedFromDate (e) {
    this.setState({ dateFrom : e })
  }

  checkedToDate (e) {
    this.setState({ dateTo : e })
  }

  submitLeaveFiling () {
    const {
      feedbackTextareaValueRemarks,
      dateFrom,
      dateTo,
      toTime,
      fromTime
    } = this.state

    if(!new RequiredValidation().isValid(dateFrom)) {
      this.setState({ errorMessageRemarksDateFrom : 'Date is Required' })
    } else if(!new RequiredValidation().isValid(dateTo)) {
      this.setState({ errorMessageRemarksDateTo : 'Date is required' })
    } else if(!new RequiredValidation().isValid(fromTime)) {
      this.setState({ errorMessageRemarksTimeFrom : 'Time is required' })
    } else if(!new RequiredValidation().isValid(toTime)) {
      this.setState({ errorMessageRemarksTimeTo : 'Time is required' })
    } else if(!new RequiredValidation().isValid(feedbackTextareaValueRemarks)) {
      this.setState({ errorMessageRemarks : 'Remarks is required' })
    } else {
      this.setState({ showEditMode : true })
    }
  }

  submitForm () {
    const {
      feedbackTextareaValue,
      feedbackTextareaValueRemarks,
      dateFrom,
      dateTo,
      fromTime,
      fromMeridiem,
      toTime,
      toMeridiem
    } = this.state

    const {
      benefitsCodeType
    } = this.props
    let dateTimeFrom = moment(dateFrom).format('MM/DD/YYYY') + ' ' + fromTime + ':00 ' + fromMeridiem
    let dateTimeTo = moment(dateTo).format('MM/DD/YYYY') + ' ' + toTime + ':00 ' + toMeridiem
    this.presenter.addLeaveFiling(
      benefitsCodeType.toUpperCase(),
      dateTimeFrom,
      dateTimeTo,
      LeaveFilingFunctions.checkedReasonForLeave(benefitsCodeType),
      feedbackTextareaValueRemarks,
    )
  }

  render () {
    const {
      benefitsCodeType,
      navigateBenefits
    } = this.props

    const {
      showEditMode,
      feedbackTextareaValueRemarks,
      enabledLoader,
      successMessage,
      dateFrom,
      dateTo,
      showSuccessModal,
      errorMessageRemarks,
      errorMessageRemarksDateFrom,
      errorMessageRemarksDateTo,
      errorMessageRemarksTimeFrom,
      errorMessageRemarksTimeTo,
      fromTime,
      fromMeridiem,
      toTime,
      toMeridiem
    } = this.state

    return (
      <div className={ 'brv-container' }>
        { super.render() }
        <div className={ 'brv-grid-column-2' }>
          {
            showSuccessModal &&
            <Modal>
              <center>
                <h2>{ successMessage.message }</h2>
                <br/>
                <GenericButton
                  onClick = { () => {
                    this.setState({ showSuccessModal : false })
                    this.navigate()
                    }
                  }
                  text = { 'Ok' }/>
              </center>
            </Modal>
          }
          <div></div>
          <div>
            {
              enabledLoader ?
              <center className = { 'circular-loader-center' }>
                <CircularLoader show = { true }/>
              </center>
              :
              <Card className = { 'bereavement-leave-card' }>
                <h2 className = { 'tex-align-center' }>Leave Filing</h2>
                <br/>
                <div className = { 'grid-global' }>
                  <div>
                    <DatePicker
                      readOnly
                      minDate = { moment() }
                      selected = { dateFrom ? moment(dateFrom) : '' }
                      text = { 'From Date' }
                      onChange = { (e) => this.checkedFromDate(e) }
                      disabled = { showEditMode }
                      errorMessage = { dateFrom ? '' : errorMessageRemarksDateFrom }
                      />
                  </div>
                  <div>
                    <div></div>
                    <DatePicker
                      readOnly
                      minDate = { moment(dateFrom) }
                      disabled = { showEditMode }
                      onChange = { (e) => this.checkedToDate(e) }
                      errorMessage = { dateTo ? '' : errorMessageRemarksDateTo }
                      selected = { dateTo ? moment(dateTo) : '' }
                      text = { 'To Date' }/>
                  </div>
                </div>
                <div className = { 'grid-global' }>
                  <div>
                    <TimePickerComponent
                      text = { 'From Time' }
                      format = { 'hh:mm' }
                      timeMode = { '12' }
                      meridiem = { fromMeridiem ? fromMeridiem : 'AM' }
                      time = { fromTime ? fromTime : '8:30'}
                      onTimeChange = { this.fromTimeChange }
                      disabled = { showEditMode }
                      errorMessage = { fromTime ? '' : errorMessageRemarksTimeFrom }
                    />
                  </div>
                  <div>
                    <div></div>
                    <TimePickerComponent
                      text = { 'To Time' }
                      format = { 'hh:mm' }
                      timeMode = { '12' }
                      meridiem = { toMeridiem ? toMeridiem : 'PM'}
                      time = { toTime ? toTime : '5:30' }
                      onTimeChange = { this.toTimeChange }
                      disabled = { showEditMode }
                      errorMessage = { toTime ? '' : errorMessageRemarksTimeTo }
                    />
                  </div>
                </div>
                <div>
                  <GenericInput
                    text = { 'Reason for Leave' }
                    value = { LeaveFilingFunctions.checkedReasonForLeave(benefitsCodeType) }
                    readOnly
                  />
                  <GenericInput
                    disabled = { showEditMode }
                    text = { 'Remarks' }
                    onChange = { (e) => this.getTextareaValueRemarks(e.target.value) }
                    hint = { 'Enter Remarks' }
                    value = { feedbackTextareaValueRemarks ? feedbackTextareaValueRemarks : '' }
                    errorMessage = { feedbackTextareaValueRemarks ? '' : errorMessageRemarks }
                  />
                </div>
                <br/>
              <div>
                {
                  showEditMode ?
                  <div className = { 'grid-global' }>
                    <GenericButton
                      text = { 'Edit' }
                      onClick = { () => this.setState({ showEditMode : false }) }
                      />
                    <GenericButton
                      text = { 'Submit' }
                      onClick = { () => this.submitForm() }
                      />
                  </div>
                  :
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      className = { 'leave-filing-submit' }
                      text = { 'Continue' }
                      onClick = { () => this.submitLeaveFiling() }
                      />
                  </div>
                }
              </div>
              </Card>
              }
            </div>
          <div></div>
        </div>
      </div>
    )
  }
}

LeaveFilingFragment.propTypes = {
  benefitsCodeType : PropTypes.string,
}

export default ConnectView(LeaveFilingFragment, Presenter)
