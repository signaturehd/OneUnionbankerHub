import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/NbiClearancePresenter'

import {
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

class NbiClearanceFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(7)
  }

  render () {
    const nbiClearance = [{
      name : 'NBI Clearance'
    }]

    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>NBI Clearance</h2>
            <h2>Please secure the transaction by attaching your latest NBI Clearance</h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            percent={ percentage } />
        </div>
        <br/>
        <Line />
        <br/>
          <MultipleFileUploader
            fileArray = { nbiClearance }
            />
      </div>
    )
  }
}

NbiClearanceFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(NbiClearanceFragment, Presenter )
