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

class MedicalAppointmentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(19)
  }

  updateFunction () {

  }

  saveFunction () {

  }

  render() {
    const {
      history,
      percentage,
    } = this.props

  return(
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
                maxLength = { 30 }
                />
              <GenericInput
                text = { 'Package' }
                maxLength = { 20 }
                />
            </div>
            <DatePicker
              text = { 'Preferred Schedule' }
              />
            <br/>
            <Line/>
            <br/>
            <div>
              <h2 className={ 'text-align-left' }>Package Procedures</h2>
              <h4 className = { 'font-weight-lighter' }>Procedures that are marked with asterisk(*) are required.</h4>
            <br/>
            </div>
          </div>
        </div>
        <br/>
        <center>
          <GenericButton
            className = { 'global-button' }
            text = { 'Edit' }
            onClick = { () => this.updateFunction() }
            />
          <GenericButton
            className = { 'global-button' }
            text = { 'Save' }
            onClick = { () => this.saveFunction() }
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
