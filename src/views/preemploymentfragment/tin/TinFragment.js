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
    this.state = {
      tinData : [],
      tinInput : ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(10)
    this.presenter.getEmployeeTin()
  }

  showEmployeeTinData (tinData) {
    this.setState({ tinData })
  }

  render () {
    const tinAttachment = [{
      name : 'TIN ID/ BIR FORM',
    }]

    const { tinData, tinInput } = this.state
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
            value = { tinData && tinData.tin ? tinData.tin : tinInput }
            onChange = { e => this.setState({ tinInput : e.target.value }) }
          />
        <br/>
        <Line />
        <br/>
          <MultipleFileUploader
            placeholder = { 'TIN Attachments' }
            fileArray = { tinAttachment }
            />
      </div>
    )
  }
}

TinFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(TinFragment, Presenter )
