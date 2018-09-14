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
  SingleInputModal,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/FinancialObligationPresenter'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/financialObligationStyle.css'

class FinancialObligationFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      financeStatus : [],
      showFinanceStatusModal : false,
      enabledLoader : false,
      showFinanceStatusErrorMessage : '',
      statusId: '',
      statusName: '',
      bankNameInstitution : '',
      natureObligation: '',
      amount: ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(1)
    this.presenter.getFinancialStatus()
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  showFinanceStatus (financeStatus) {
    this.setState({ financeStatus })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props
    const {
      enabledLoader,
      financeStatus,
      statusId,
      statusName,
      showFinanceStatusModal,
      showFinanceStatusErrorMessage,
      bankNameInstitution,
      natureObligation,
      amount
    } = this.state

    return(
    <div>
    { super.render() }
      {
        showFinanceStatusModal &&
        <SingleInputModal
          label = { 'Finance Status' }
          inputArray = { financeStatus && financeStatus }
          selectedArray = { (statusId, statusName) =>
            this.setState({
              statusId,
              statusName,
              showFinanceStatusModal : false,
              showFinanceStatusErrorMessage : ''
            })
          }
        onClose = { () => this.setState({ showFinanceStatusModal : false }) }
        />
      }
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
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { true }/>
          </center>
          :
          <div>
            <GenericInput
              text = { 'Name of the Bank/ Financial Institution' }
              value = { bankNameInstitution }
              onChange = { () => {} }
              />
            <GenericInput
              text = { 'Nature of Obligation' }
              value = { natureObligation }
              onChange = { () => {} }
              />
            <GenericInput
              text = { 'Amount' }
              value = { amount }
              onChange = { () => {} }
              />
            <GenericInput
              text = { 'Status' }
              value = { statusName }
              onClick = { () => this.setState({ showFinanceStatusModal : true }) }
              />
            <center>
              <GenericButton
                className = { 'global-button' }
                text = { 'Save' }
                onClick = { () => {} }
                />
            </center>
          </div>
        }
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
