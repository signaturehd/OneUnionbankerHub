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
  CircularLoader
} from '../../ub-components/'

import './styles/leaveFilingStyle.css'

class LeaveFilingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      feedbackTextareaValue: '',
      feedbackTextareaValueRemarks: '',
      enabledLoader : false
    }
  }

  getTextareaValue (e) {
    this.setState({ feedbackTextareaValue:  e })
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

  render () {
    const { navigateBenefits } = this.props
    const {
      feedbackTextareaValue,
      feedbackTextareaValueRemarks,
      enabledLoader
    } = this.state

    return (
      <div className={ 'brv-container' }>
        { super.render() }
        <div className={ 'brv-grid-column-2' }>
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
                      text = { 'From Date' }/>
                  </div>
                  <div>
                    <div></div>
                    <DatePicker
                      readOnly
                      text = { 'To Date' }/>
                  </div>
                </div>
                <div className = { 'grid-global' }>
                  <div>
                    <GenericInput
                      text = { 'From Time' }/>
                  </div>
                  <div>
                    <div></div>
                    <GenericInput
                      text = { 'To Time' }/>
                  </div>
                </div>
                <div>
                  <textarea
                    onChange = { (e) => this.getTextareaValue(e.target.value) }
                    className = { 'feedback-textarea' }
                    placeholder = { 'Enter Feedback' }
                    value = { feedbackTextareaValue ? feedbackTextareaValue : '' }
                  />
                  <textarea
                    onChange = { (e) => this.getTextareaValueRemarks(e.target.value) }
                    className = { 'feedback-textarea' }
                    placeholder = { 'Enter Feedback' }
                    value = { feedbackTextareaValueRemarks ? feedbackTextareaValueRemarks : '' }
                  />
                </div>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    className = { 'bereavement-leave-submit' }
                    text = { 'Submit' }
                    onClick = { () => navigateBenefits() }
                    />
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
}

export default ConnectView(LeaveFilingFragment, Presenter)
