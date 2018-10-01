import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/PagIbigPresenter'

import {
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

class PagIbigFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(14)
  }

  render () {
    const phAttachment = [{
      name : 'Pag-IBIG 1',
    }]

    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        <div className = { 'percentage-grid' }>
          <div>
          <h2 className={ 'header-margin-default text-align-left' }>Pag-IBIG</h2>
          <br/>
          <h2>Set up your Pag-IBIG</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
          <GenericButton
            text = { 'Taxpayer Identification Number(TIN)' }
          />
        <br/>
        <Line />
        <br/>
          <MultipleFileUploader
            placeholder = { 'Pag-IBIG Attachments' }
            fileArray = { phAttachment }
            />
      </div>
    )
  }
}

PagIbigFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(PagIbigFragment, Presenter )
