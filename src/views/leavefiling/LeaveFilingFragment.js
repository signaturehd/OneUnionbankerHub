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
    }
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
    } = this.state

    if(!new RequiredValidation().isValid(dateFrom)) {
      this.setState({ errorMessageRemarksDateFrom : 'Date is Required' })
    } else if(!new RequiredValidation().isValid(dateTo)) {
      this.setState({ errorMessageRemarksDateTo : 'Date is required' })
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
    } = this.state

    const {
      benefitsCodeType
    } = this.props
    let dateTimeFrom = moment(dateFrom).format('MM/DD/YYYY') + ' 08:30:00 AM'
    let dateTimeTo = moment(dateTo).format('MM/DD/YYYY') + ' 05:30:00 PM'
    this.presenter.addLeaveFiling(
      LeaveFilingFunctions.checkedReasonForLeave(benefitsCodeType),
      dateTimeFrom,
      dateTimeTo,
      feedbackTextareaValue,
      feedbackTextareaValueRemarks,
    )
  }

  render () {
    console.log(benefitsCodeType)
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
      errorMessageRemarksDateTo
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
                    navigateBenefits
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
                    <GenericInput
                      disabled = { showEditMode }
                      text = { 'From Time' }/>
                  </div>
                  <div>
                    <div></div>
                    <GenericInput
                      disabled = { showEditMode }
                      text = { 'To Time' }/>
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
