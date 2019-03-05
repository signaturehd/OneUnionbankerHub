import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionApprovalDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader, GenericButton } from '../../ub-components'

import './styles/transactionDetails.css'

import DentalLoaDetailsFragment from './fragments/DentalLoaDetailsFragment'
import DentalRDetailsFragment from './fragments/DentalRDetailsFragment'
import EducAidDetailsFragment from './fragments/EducAidDetailsFragment'
import EducGrantAidDetailsFragment from './fragments/EducGrantAidDetailsFragment'
import EducGrantPlanDetailsFragment from './fragments/EducGrantPlanDetailsFragment'
import EducGroupPlanDetailsFragment from './fragments/EducGroupPlanDetailsFragment'
import LoansDetailsFragment from './fragments/LoansDetailsFragment'
import OpticalDetailsFragment from './fragments/OpticalDetailsFragment'
import CalamityAssistanceDetailsFragment from './fragments/CalamityAssistanceDetailsFragment'

import ConfirmationModal from '../remarks/ConfirmationModal'
import DisapproveModal from '../remarks/DisapproveModal'

function  TransactionDetails (props)  {
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  const transactionsPerson = props.transactions
  const attachments = props.attachments

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
    } else if (transactionId === 13) {
      return <EducGrantAidDetailsFragment
        details = { transactionDetails }
        attachments = { attachments }
        transactionsPerson = { transactionsPerson }/>
    } else if (transactionId === 12) {
      return <DentalRDetailsFragment
        details = { transactionDetails }
        attachments = { attachments }
        transactionsPerson = { transactionsPerson } />
    } else if (transactionId === 11) {
      return <DentalRDetailsFragment
        details = { transactionDetails }
        attachments = { attachments }
        transactionsPerson = { transactionsPerson }/>
    } else if (transactionId === 32) {
      return <DentalRDetailsFragment
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
      return <LoansDetailsFragment
        transactionsPerson = { transactionsPerson }
        attachments = { attachments }
        details = { transactionDetails } />
    } else if (transactionId === 22) {
      // Calamity Assistance
      return <CalamityAssistanceDetailsFragment
        transactionsPerson = { transactionsPerson }
        attachments = { attachments }
        details = { transactionDetails } />
    } else if (transactionId === 16) {
     return <h1>Transaction for LaptopLease</h1>  
    }
    return <h1>No Transaction Occured please reload</h1> // No  Transaction
}

class TransactionApprovalDetailsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      details : null,
      transactions : null,
      showConfirmationModal : false,
      showDisapproveModal : false,
      remarks : null,
      attachments : null
    }
  }

  showModal1 () {
    this.setState({ showConfirmationModal : true })
  }

  showModal2 () {
    this.setState({ showDisapproveModal : true })
  }

  approve (approve, remarks) {
    this.props.presenter.getTransactionsApproval(true, remarks)
  }

  disapprove (approve, remarks) {
    this.props.presenter.getTransactionsApproval()
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/approval')
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.setSelectedNavigation(1)
    this.presenter.getTransactionDetails(id)
    this.presenter.getTransactionsPersonal()
  }

  showAttachments (attachments) {
    this.setState({ attachments })
  }

  getTransactionDetails (details) {
    this.setState({ details })
  }

  transactions (transactions) {
    this.setState({ transactions })
  }

  render () {
    const {
      details,
      onClick,
      transactions,
      showConfirmationModal,
      showDisapproveModal,
      remarks,
      attachments
    } = this.state
    return (
      <div  className = {'container'}>
        <div>
          <i className = { 'back-arrow' } onClick = {
              this.navigate.bind(this) }></i>
            <h2 className = { 'header-margin-default' }>
              { details ? details.benefitType.name : 'Transaction' }
            </h2>
        </div>
        {
          showConfirmationModal &&
          <ConfirmationModal
            history = { this.props.history }
            transactionId = { details && details.transactionId }
            onClose = { () => this.setState({ showConfirmationModal : false })}
          />
        }
        {
          showDisapproveModal &&
          <DisapproveModal
            remarksDetails = { remarks }
            history = { this.props.history }
            transactionId = { details && details.transactionId }
            benefitId = { details && details.benefitType.id }
            onClose = { () => this.setState({ showDisapproveModal : false })}
          />
        }
        {
          details ?
            <div className = {'transaction-details-container'}>
              <TransactionDetails
               details = { details }
               attachments = { attachments }
               transactions = { transactions }
              />
            <center>
              <p>By approving, you guarantee the accuracy and the authenticity of the original documents attached herewith</p>
            </center>
            <center className = { 'transaction-card-details-form' }>
                <GenericButton
                  text = { 'Approve' }
                  onClick = { () => this.showModal1() }/>
                <GenericButton
                  text = { 'Disaprove' }
                  onClick = { () => this.showModal2() }/>
              </center>
            </div>            :
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
