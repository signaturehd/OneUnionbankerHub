import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader, GenericButton } from '../../ub-components'

import './styles/transaction-details.css'

import DentalLoaDetailsFragment from './fragments/DentalLoaDetailsFragment'
import DentalRDetailsFragment from './fragments/DentalRDetailsFragment'
import EducAidDetailsFragment from './fragments/EducAidDetailsFragment'
import EducGrantAidDetailsFragment from './fragments/EducGrantAidDetailsFragment'
import EducGrantPlanDetailsFragment from './fragments/EducGrantPlanDetailsFragment'
import EducGroupPlanDetailsFragment from './fragments/EducGroupPlanDetailsFragment'
import LoansDetailsFragment from './fragments/LoansDetailsFragment'
import OpticalDetailsFragment from './fragments/OpticalDetailsFragment'

function  TransactionDetails ( props )  {
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  const transactionsPerson = props.transactions
  if (transactionId == 6) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId == 7) {
    return <DentalLoaDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson } />
  } else if (transactionId == 8) {
    return <OpticalDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId == 11) {
    return <EducGrantAidDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId == 12) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson } />
  } else if (transactionId == 13) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId == 32) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId == 1) {
    return <LoansDetailsFragment
      transactionsPerson = { transactionsPerson }
      details = { transactionDetails } />
  } else {
    return <h1>No Transaction Occured please reload</h1> // No  Transaction
  }
}

class TransactionApprovalDetailsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      details : null,
      transactions : null,
    }
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/approval')
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    const id = this.props.match.params.id
    this.presenter.getTransactionDetails(id)
    this.presenter.getTransactionsPersonal()

  }

  getTransactionDetails (details) {
    this.setState({ details })
  }

  transactions( transactions ) {
    this.setState({ transactions })
  }

  render () {
    const { details, onClick } = this.state
    return (
      <div  className = {'container'}>
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = {
              this.navigate.bind(this) }></i>
          <h1>{ details ? details.benefitType.name : 'Transaction' }</h1>
        </div>
        {
          details ?
            <div className = {'transaction-details-container'}>
              <TransactionDetails
               details = { details }
               transactions = { transactions }
              />
            <center>
              <p>By approving, you guarantee the accuracy and the authenticity of the original documents attached herewith</p>
            </center>
            <center className = { 'transaction-card-details-form' }>
                <GenericButton
                  text = { 'Approve' }
                  onClick = { onClick }/>
                <GenericButton
                  text = { 'Disaprove' }
                  onClick = { onClick }/>
              </center>
            </div>
            :
            <div className = {'transaction-details-loader'}>
              <center>
                <CircularLoader show = {true}/>
              </center>
            </div>
        }

      </div>
    )
  }
}

export default ConnectPartial(TransactionApprovalDetailsFragment, Presenter)
