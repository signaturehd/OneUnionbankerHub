import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/TinPresenter'

import {
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

class TinFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(10)
  }

  render () {
    const sssAttachment = [{
      name : 'TIN ID/ BIR FORM',
    }]

    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>TIN Form</h2>
            <h2></h2>
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
            text = { 'Taxpayer Identification Number(TIN)' }
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

TinFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(TinFragment, Presenter )
