import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/SSSPresenter'

import {
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

class SSSFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      sssData : [],
      sssInput : ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(8)
    this.presenter.getEmployeeSSS()
  }

  showEmployeeSSSData (sssData) {
    this.setState({ sssData })
  }

  render () {
    const sssAttachment = [{
      name : 'E1 Form',
    },{
      name : 'SSS ID'
    }]
    const { sssData, sssInput } = this.state
    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>SSS Form</h2>
            <h2>Please input your SSS number and attach the missing requirements to settle the transaction.</h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
          <GenericInput
            value = { sssData && sssData.sss ? sssData.sss : sssInput }
            text = { 'SSS Number' }
            onChange = { e => this.setState({ sssInput : e.target.value }) }
          />
        <br/>
        <Line />
        <br/>
          <MultipleFileUploader
            placeholder = { 'SSS Attachments' }
            fileArray = { sssAttachment }
            />
      </div>
    )
  }
}

SSSFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(SSSFragment, Presenter )
