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
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(8)
  }

  render () {
    const sssAttachment = [{
      name : 'E1 Form',
    },{
      name : 'SSS ID'
    }]

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
            percent={ percentage } />
        </div>
        <br/>
          <GenericInput
          text = { 'SSS Number' }
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
