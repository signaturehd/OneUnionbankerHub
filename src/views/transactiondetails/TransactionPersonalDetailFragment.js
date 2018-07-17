

import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionPersonalDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components'

import './styles/transactionDetails.css'


import DentalLoaDetailsFragment from './fragments/DentalLoaDetailsFragment'
import DentalRDetailsFragment from './fragments/DentalRDetailsFragment'
import EducAidDetailsFragment from './fragments/EducAidDetailsFragment'
import EducGrantAidDetailsFragment from './fragments/EducGrantAidDetailsFragment'
import EducGrantPlanDetailsFragment from './fragments/EducGrantPlanDetailsFragment'
import EducGroupPlanDetailsFragment from './fragments/EducGroupPlanDetailsFragment'
import LoansDetailsFragment from './fragments/LoansDetailsFragment'
import OpticalDetailsFragment from './fragments/OpticalDetailsFragment'
import CarLeaseDetailsFragment from './fragments/CarLeaseDetailsFragment'
import CalamityAssistanceDetailsFragment from './fragments/CalamityAssistanceDetailsFragment'
import BereavementDetailsFragment from './fragments/BereavementDetailsFragment'

function  TransactionDetails (props)  {
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  const transactionsPerson = props.transactions
  const attachments = props.attachments
  const uploadImage = props.uploadImage
  if (transactionId === 6) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 7) {
    return <DentalLoaDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson } />
  } else if (transactionId === 8) {
    return <OpticalDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 15) {
    return <CarLeaseDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 13) {
    return <EducGrantAidDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 12) {
    return <EducGroupPlanDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson } />
  } else if (transactionId === 11) {
    return <EducAidDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 32) {
    return <EducGrantPlanDetailsFragment
      details = { transactionDetails }
      attachments = { attachments }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 1) {
    return <LoansDetailsFragment
      transactionsPerson = { transactionsPerson }
      attachments = { attachments }
      details = { transactionDetails } />
  } else if (transactionId === 21) {
    // Bereavement Transaction Details
    return <BereavementDetailsFragment
      transactionsPerson = { transactionsPerson }
      uploadImage = { (transactionId, file) => uploadImage(21, transactionId, file) }
      attachments = { attachments }
      details = { transactionDetails } />
  } else if (transactionId === 22) {
    // Calamity Assistance
    return <CalamityAssistanceDetailsFragment
    uploadImage = { (transactionId, file) => uploadImage(22, transactionId, file) }
      transactionsPerson = { transactionsPerson }
      attachments = { attachments }
      details = { transactionDetails }
     />
  }
    return <h1>No Transaction Occured please reload</h1> // No  Transaction
}

class TransactionPersonalDetailsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      details : null,
      transactions : null,
      attachment : null,
      response : null
    }
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/personal')
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    const id = this.props.match.params.id
    this.presenter.getTransactionDetails(id)
    this.presenter.getTransactionsPersonal()
  }

  showAttachments (attachments) {
    this.setState({ attachments })
  }

  transactions (transactions) {
    this.setState({ transactions })
  }

  showFileReceipt( response ) {
    this.setState({ response })
  }

  getTransactionDetails (details) {
    this.setState({ details })
  }

  render () {
    const {
      details,
      transactions,
      attachments,
      response
    } = this.state
    return (
      <div  className={ 'container' }>
        <div>
        <i className={ 'back-arrow' } onClick = {
            this.navigate.bind(this) }></i>
          <h2 className={ 'header-margin-default' }>
            { details ? details.benefitType.name : 'Transaction' }
          </h2>
        </div>
        {
          details ?
            <div className={ 'transaction-detail-container' }>
              <TransactionDetails
               details={ details }
               attachments={ attachments }
               transactions={ transactions }
               showUploading={ response }
               uploadImage = { (transactionType, transactionId, file) => {
                 this.presenter.uploadImage(transactionType, transactionId, file)
               }}
              />
            </div>            :
            <div className={ 'transaction-details-loader' }>
              <center>
                <CircularLoader show={ true }/>
              </center>
            </div>
        }
      </div>
    )
  }
}

export default ConnectPartial(TransactionPersonalDetailsFragment, Presenter)
