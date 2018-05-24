import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components'

import './styles/transaction-details.css'

function  TransactionDetails ( props )  {
  console.log(props)
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  if (transactionId == 6) {
      return <h1>Dental R</h1>
     // return <DentalReimbursementModalFragment  transactionDetails = { transactionDetails } /> // Dental Reimbursement Fragment
  } else if (transactionId == 7) {
    return <h1>Dental LOA</h1>
     // return <DentalLOAModalFragment  transactionDetails = { transactionDetails } /> // Dental Loa Fragment
  } else if (transactionId == 8) {
    return <h1>Optical</h1>
    // return <OpticalModalFragment  transactionDetails = { transactionDetails } />  // Optical Fragment Fragment
  } else if (transactionId == 11) {
    return  <h2></h2> // Educational Reimbursement Personal
  } else if (transactionId == 12) {
    return <h2></h2> // Educational Reimbursement Dependent
  } else if (transactionId == 13) {
    return  <h2></h2> // Educational Grant Personal
  } else if (transactionId == 32) {
    return  <h2></h2> // Educational Grant Dependent
  } else if (transactionId == 1) {
    return <h1>MPL</h1> // Loans
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
    console.log(details)

    return (
      <div  className = {'container'}>
        <i className = { 'left' } onClick = {
            this.navigate.bind(this) }></i>
          <h1>Transaction for Personal</h1>
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
