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

import { RequiredValidation } from '../../../utils/validate/'

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
      amount: '',
      bankNameInstitutionErrorMessage : '',
      natureObligationErrorMessage: '',
      amountErrorMessage: '',
      statusNameErrorMessage: '',
      noticeResponse: '',
      showFinanceModal : false
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(1)
    this.presenter.getFinancialStatus()
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showFinanceStatus (financeStatus) {
    this.setState({ financeStatus })
  }

  noticeResponseFunc (noticeResponse) {
    this.setState({ showFinanceModal : true })
    this.setState({ noticeResponse })
  }

  submitForm () {
    const {
      bankNameInstitution,
      natureObligation,
      amount,
      statusName,
      statusId,
      bankNameInstitutionErrorMessage,
      natureObligationErrorMessage,
      amountErrorMessage,
      statusNameErrorMessage
    } = this.state

    if (!this.validator(bankNameInstitution)) {
      this.setState({ bankNameInstitutionErrorMessage: 'Name of the Bank/ Financial Institution field is required' })
    } else if (!this.validator(natureObligation)) {
      this.setState({ natureObligationErrorMessage : 'Nature of Obligation field is required'  })
    } else if (!this.validator(amount)) {
      this.setState({ amountErrorMessage : 'Amount field is required'  })
    } else if (!this.validator(statusName)) {
      this.setState({ statusNameErrorMessage : 'Status field is required' })
    }
    this.presenter.addFinancialStatus(
      bankNameInstitution,
      natureObligation,
      amount,
      statusId)
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
      amount,
      bankNameInstitutionErrorMessage,
      natureObligationErrorMessage,
      amountErrorMessage,
      statusNameErrorMessage,
      noticeResponse,
      showFinanceModal
    } = this.state

    return(
    <div>
    { super.render() }
      {
        showFinanceModal &&
        <Modal>
          <center>
            <h2>{ noticeResponse }</h2>
            <br/>
            <GenericButton
              onClick = { () => this.setState({ showFinanceModal : false }) }
              text = { 'Ok' }
              />
          </center>
        </Modal>
      }
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
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader }/>
          </center>
          :
          <div>
            <GenericInput
              text = { 'Name of the Bank/ Financial Institution' }
              value = { bankNameInstitution }
              onChange = { (e) => this.setState({ bankNameInstitution: e.target.value }) }
              errorMessage = { bankNameInstitution ? '' : bankNameInstitutionErrorMessage }
              />
            <GenericInput
              text = { 'Nature of Obligation' }
              value = { natureObligation }
              onChange = { (e) => this.setState({ natureObligation : e.target.value }) }
              errorMessage = { natureObligation ? '' : natureObligationErrorMessage }
              />
            <GenericInput
              text = { 'Amount' }
              value = { amount }
              type = { 'number' }
              onChange = { (e) => this.setState({ amount : e.target.value }) }
              errorMessage = { amount ? '' : amountErrorMessage }
              />
            <GenericInput
              text = { 'Status' }
              value = { statusName }
              onClick = { () => this.setState({ showFinanceStatusModal : true }) }
              errorMessage = { statusName ? '' : statusNameErrorMessage }
              />
            <center>
              <GenericButton
                className = { 'global-button' }
                text = { 'Save' }
                onClick = { () => this.submitForm() }
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
