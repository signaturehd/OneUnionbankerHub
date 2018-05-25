import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components'

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
  if (transactionId == 6) {
    return <DentalRDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 7) {
    return <DentalLoaDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 8) {
    return <OpticalDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 11) {
    return <EducGrantAidDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 12) {
    return <DentalRDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 13) {
    return <DentalRDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 32) {
    return <DentalRDetailsFragment details = { transactionDetails } />
  } else if (transactionId == 1) {
    return <LoansDetailsFragment details = { transactionDetails } />
  } else {
    return <h1>No Transaction Occured please reload</h1> // No  Transaction
  }
}

class TransactionPersonalDetailsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      details : null
    }
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/personal')
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    const id = this.props.match.params.id
    this.presenter.getTransactionDetails(id)
  }

  getTransactionDetails (details) {
    this.setState({ details })
  }

  render () {
    const { details } = this.state
    return (
      <div  className = {'container'}>
        <i className = { 'left' } onClick = {
            this.navigate.bind(this) }></i>
            <h1>{ details ? details.benefitType.name : 'Transaction' }</h1>
        {
          details ?
            <div className = {'transaction-detail-container'}>
              <TransactionDetails
               details = { details }
              />
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

export default ConnectPartial(TransactionPersonalDetailsFragment, Presenter)
