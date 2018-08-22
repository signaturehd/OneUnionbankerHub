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
  Line
} from '../../ub-components/'

import './styles/leaveFilingStyle.css'

class LeaveFilingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  render () {
    const { navigateBenefits } = this.props
    return (
      <div className={ 'brv-container' }>
        { super.render() }
        <div className={ 'brv-grid-column-2' }>
          <div></div>
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
            <div className = { 'text-align-right' }>
              <GenericButton
                className = { 'bereavement-leave-submit' }
                text = { 'Submit' }
                onClick = { () => navigateBenefits() }
                />
            </div>
          </Card>
          <div></div>
        </div>
      </div>
    )
  }
}

LeaveFilingFragment.propTypes = {
}

export default ConnectView(LeaveFilingFragment, Presenter)
