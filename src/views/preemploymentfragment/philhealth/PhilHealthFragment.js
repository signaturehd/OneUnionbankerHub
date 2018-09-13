import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/PhilHealthPresenter'

import {
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

class PhilHealthFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(10)
  }

  render () {
    const sssAttachment = [{
      name : 'PhilHealth 1',
    }]

    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>PhilHealth</h2>
            <h2>Setup your PhilHealth</h2>
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
            placeholder = { 'PhilHealth Attachments' }
            fileArray = { sssAttachment }
            />
      </div>
    )
  }
}

PhilHealthFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(PhilHealthFragment, Presenter )
