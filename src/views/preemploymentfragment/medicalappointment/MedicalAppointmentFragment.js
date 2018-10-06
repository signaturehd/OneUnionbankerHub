import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  GenericButton,
  CircularLoader,
  GenericInput,
  SingleInputModal,
  Card,
  Line,
  DatePicker,
  Checkbox,
  MultipleAttachments,
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import Presenter from './presenter/MedicalAppointmentPresenter'

import { Progress } from 'react-sweet-progress'

import NoticeResponseModal from '../../notice/NoticeResponseModal'

import 'react-sweet-progress/lib/style.css'

import moment from 'moment'

class MedicalAppointmentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      medicalAppointmentData : [],
      preferredDate : ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(19)
    this.presenter.getMedicalAppointment()
  }

  showMedicalAppointment (medicalAppointmentData) {
    this.setState({ medicalAppointmentData })
  }

  saveFunction (preferredDate) {
    this.presenter.updateMedicalAppointment(preferredDate)
  }

  render() {
    const {
      medicalAppointmentData,
      preferredDate
    } = this.state

    const {
      history,
      percentage,
    } = this.props

  return (
    <div>
    { super.render() }

      <div className = { 'percentage-grid' }>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }>Medical Appointment</h2>
          <h2>Please fill up the form below by choosing your preferred clinic, packages, and date to complete the transaction.</h2>
        <br/>
        </div>
        <Progress
          type = { 'circle' }
          height = { 100 }
          width = { 100 }
          percent={ percentage }
        />
        </div>
      <div>
        <div>
          <div>
            <div className = { 'grid-global' }>
              <GenericInput
                text = { 'Clinic' }
                value = { `St. Luke's Medical Center - Global City` }
                disabled = { true }
                maxLength = { 30 }
                />
              <GenericInput
                text = { 'Package' }
                value = { medicalAppointmentData.package }
                disabled = { true }
                maxLength = { 20 }
                />
            </div>
            <DatePicker
              text = { 'Preferred Schedule' }
              maxDate = {  moment() }
              hint = { '(eg. MM/DD/YYYY)' }
              selected = { preferredDate && moment(preferredDate) }
              onChange = { (e)  =>
                this.setState({ preferredDate: e.format('MM-DD-YYYY') })
               }
              />
            <br/>
            <Line/>
            <br/>
            <div>
              <h2>Package Procedures</h2>
              <h4 className = { 'font-weight-lighter font-size-16px' }>Procedures that are marked with asterisk(*) are required.</h4>
              <br/>
              {
                medicalAppointmentData &&
                medicalAppointmentData.procedures &&
                medicalAppointmentData.procedures.map((resp, key) =>
                  <div
                    className = { 'font-size-14px' }
                    key = { key }>
                    { resp }
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <br/>
        <center>
          <GenericButton
            className = { 'global-button' }
            text = { 'Submit' }
            onClick = { () => this.saveFunction(preferredDate) }
            />
        </center>
      </div>
    </div>
    )
  }
}

MedicalAppointmentFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

MedicalAppointmentFragment.defaultProps = {
}

export default ConnectView(MedicalAppointmentFragment, Presenter)
