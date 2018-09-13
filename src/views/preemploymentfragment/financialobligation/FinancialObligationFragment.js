import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/FinancialObligationPresenter'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/financialObligationStyle.css'

class FinancialObligationFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(1)
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    return(
    <div>
    { super.render() }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Financial Obligation</h2>
            <h2>Fill up the form</h2>
          </div>
          <Progress
            type = { 'circle' }
            percent={ percentage } />
        </div>
        <br/>
        <GenericInput
          text = { 'Name of the Bank/ Financial Institution' }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Nature of Obligation' }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Amount' }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Status' }
          onChange = { () => {} }
          />
        <center>
          <GenericButton
            className = { 'global-button' }
            text = { 'Save' }
            onClick = { () => {} }
            />
        </center>
      </div>
    </div>
    )
  }
}

FinancialObligationFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

FinancialObligationFragment.defaultProps = {
}

export default ConnectView(FinancialObligationFragment, Presenter)
