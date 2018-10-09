import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionPersonalDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader, Modal, GenericButton } from '../../ub-components'

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
import MedicalSchedulingDetailsFragment from './fragments/MedicalSchedulingDetailsFragment'
import OutpatientDetailsFragment from './fragments/OutpatientDetailsFragment'
import MaternityAssistanceDetailsFragment from './fragments/MaternityAssistanceDetailsFragment'
import LaptopLeaseDetailsFragment from './fragments/LaptopLeaseDetailsFragment'

import TransactionDetailsAgreementsModal from './modals/TransactionDetailsAgreementsModal'
import TransactionDetailsAgreementMPLModal from './modals/TransactionDetailsAgreementMPLModal'
import TransactionDetailsFormAttachmentsModal from './modals/TransactionDetailsFormAttachmentsModal'
import TransactionDetailsFormAttachmentsMplModal from './modals/TransactionDetailsFormAttachmentsMplModal'

function  TransactionDetails (props)  {
  const transactionId = props.details ? props.details.benefitType.id : 0
  const transactionDetails = props.details
  const transactionsPerson = props.transactions
  const uploadImage = props.uploadImage
  const showFileReceipt = props.showFileReceipt
  const attachmentsMethod = props.attachmentsMethod
  const attachmentsMethodMPL = props.attachmentsMethodMPL
  const agreementsMethod = props.agreementsMethod
  const agreementsMethodMPL = props.agreementsMethodMPL
  const onConfirmationCarleaseFunc = props.onConfirmationCarleaseFunc
  const onUploadAttachmentsFunc = props.onUploadAttachmentsFunc
  const setFileCarlease = props.setFileCarlease
  const fileCarLease = props.fileCarlease
  const onConfirmationReleaseFunc = props.onConfirmationReleaseFunc
  const confirmmDetails = props.confirmmDetails
  const claimLaptopLease = props.claimLaptopLease

  if (transactionId === 6) {
    return <DentalRDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 7) {
    return <DentalLoaDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 8) {
    return <OpticalDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 15) {
    return <CarLeaseDetailsFragment
      fileCarLease = { fileCarLease }
      onConfirmationReleaseFunc = { (resp) => onConfirmationReleaseFunc(resp) }
      onConfirmationCarleaseFunc = { (id, status) => onConfirmationCarleaseFunc(id, status) }
      onUploadAttachmentsFunc = { (id, file) => onUploadAttachmentsFunc(id, file) }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      setFileCarlease = { (resp) => setFileCarlease(resp) }
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 13) {
    return <EducGrantAidDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 12) {
    return <EducGroupPlanDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson } />
  } else if (transactionId === 11) {
    return <EducAidDetailsFragment
      details = { transactionDetails }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 32) {
    return <EducGrantPlanDetailsFragment
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      details = { transactionDetails }
      transactionsPerson = { transactionsPerson }/>
  } else if (transactionId === 1) {
    return <LoansDetailsFragment
      transactionsPerson = { transactionsPerson }
      attachmentsMethodMPL = { (resp) => attachmentsMethodMPL(resp) }
      agreementsMethodMPL = { (resp) => agreementsMethodMPL(resp) }
      details = { transactionDetails } />
  } else if (transactionId === 21) {
    // Bereavement Transaction Details
    return <BereavementDetailsFragment
      transactionsPerson = { transactionsPerson }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      uploadImage = { (transactionId, file) => uploadImage(21, transactionId, file) }
      showFileReceipt = { showFileReceipt }
      details = { transactionDetails } />
  } else if (transactionId === 22) {
    // Calamity Assistance
    return <CalamityAssistanceDetailsFragment
      transactionsPerson = { transactionsPerson }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      uploadImage = { (transactionId, file) => uploadImage(22, transactionId, file) }
      showFileReceipt = { showFileReceipt }
      details = { transactionDetails }
     />
   } else if (transactionId === 10) {
     // Medical Scheduling Transaction Details
     return <MedicalSchedulingDetailsFragment
      transactionsPerson = { transactionsPerson }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      details = { transactionDetails }
      />
   } else if (transactionId === 41) {
     // Outpatient Reimbursement Transaction Details
     return <OutpatientDetailsFragment
       transactionsPerson = { transactionsPerson }
       attachmentsMethod = { (resp) => attachmentsMethod(resp) }
       agreementsMethod = { (resp) => agreementsMethod(resp) }
       details = { transactionDetails }
      />
  } else if (transactionId === 9) {
    // Maternity Assistance
    return <MaternityAssistanceDetailsFragment
      transactionsPerson = { transactionsPerson }
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      details = { transactionDetails }
     />
  } else if (transactionId === 16) {
    //Laptop Lease
    return <LaptopLeaseDetailsFragment
      attachmentsMethod = { (resp) => attachmentsMethod(resp) }
      agreementsMethod = { (resp) => agreementsMethod(resp) }
      claimLaptopLease = { (transactionId) => claimLaptopLease(transactionId) }
      confirmDetails = { (transactionId, isConfirm) => confirmmDetails(transactionId, isConfirm) }
      details = { transactionDetails }
    />
   // return <h1>Transaction for LaptopLease</h1>
  } else {
   return <h1>No Transaction Occured please reload</h1> // No  Transaction
  }
}

class TransactionPersonalDetailsFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      details : null,
      transactions : null,
      attachment : null,
      response : true,
      enabledLoader: false,
      showAttachmentsModal: false,
      showAgreementsModal: false,
      showConfirmation : false,
      showAttachmentsMPLModal : false,
      showAgreementsMethodMPL : false,
      showConfirmationMessage : '',
      fileCarLease : []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    const id = this.props.match.params.id
    this.presenter.getTransactionDetails(id)
    this.presenter.getTransactionsPersonal()
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/personal')
  }

  setCarleaseFile (fileCarLease) {
    this.setState({ fileCarLease })
  }

  showAttachmentsMethod (e) {
    this.setState({ showAttachmentsModal : e })
  }

  showAgreementsMethod (e) {
    this.setState({ showAgreementsModal : e })
  }

  showAgreementsMethodMPL (e) {
    this.setState({ showAgreementsMethodMPL : e })
  }

  showAttachments (attachments) {
    this.setState({ attachments })
  }

  showAttachmentsMethodMPL (showAttachmentsMPLModal) {
    this.setState({ showAttachmentsMPLModal })
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

  claimLaptopLease (transactionId) {
    this.presenter.confirmLaptopLease(transactionId)
  }

  /* Circular Loader */

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showMessageSuccessConfirm (showConfirmationMessage) {
    this.setState({ showConfirmationMessage, showConfirmation : true })
  }

  render () {

  const {
    details,
    transactions,
    attachments,
    response,
    enabledLoader,
    showAttachmentsModal,
    showAttachmentsMPLModal,
    showAgreementsModal,
    showAgreementsMethodMPL,
    showConfirmation,
    showConfirmationMessage,
    fileCarLease
  } = this.state

  return (
    <div  className={ 'container' }>
      {
        showAgreementsModal &&
        <TransactionDetailsAgreementsModal
          agreements = { details && details.details }
          isDismisable = { true }
          onClose = { () =>
            this.setState({ showAgreementsModal : false }) }
          />
      }
      {
        showAgreementsMethodMPL &&
        <TransactionDetailsAgreementMPLModal
          agreements = { details && details.details }
          isDismisable = { true }
          onClose = { () =>
            this.setState({ showAgreementsMethodMPL : false }) }
          />
      }
      {
        showAttachmentsMPLModal &&
        <TransactionDetailsFormAttachmentsMplModal
          attachments = { attachments }
          isDismisable = { true }
          onClose = { () =>
            this.setState({ showAttachmentsMPLModal : false }) }
          />
      }
      {
        showAttachmentsModal &&
        <TransactionDetailsFormAttachmentsModal
          attachments = { attachments }
          isDismisable = { true }
          onClose = { () =>
            this.setState({ showAttachmentsModal : false }) }
          />
      }
      {
        showConfirmation &&
        <Modal>
          <center>
            <h2>{ showConfirmationMessage ? showConfirmationMessage :  '(Not Yet Provided)' }
            </h2>
            <br/>
            <GenericButton
              text = { 'Ok' }
              onClick = { () => {
                window.location.reload()
                this.setState({ showConfirmation : false })
              }
            }
              />
          </center>
        </Modal>
      }
      <div>
        <i className={ 'back-arrow' }
          onClick = {
            this.navigate.bind(this) }>
        </i>
      </div>
      {
        enabledLoader ?
          <div className = { 'transaction-detail-container' }>
            <TransactionDetails
             details = { details }
             attachments = { attachments }
             transactions = { transactions }
             showUploading = { response }
             confirmmDetails = { (transactionId, isConfirm) => this.confirmRelease(transactionId, isConirm) }
             claimLaptopLease = { (transactionId) => this.claimLaptopLease(transactionId) }
             attachmentsMethod = { (resp) =>
               this.showAttachmentsMethod(resp)
             }
             attachmentsMethodMPL = { (resp) =>
               this.showAttachmentsMethodMPL(resp)
             }
             agreementsMethod = { (resp) =>
               this.showAgreementsMethod(resp)
             }
             agreementsMethodMPL = { (resp) =>
               this.showAgreementsMethodMPL(resp)
             }
             onConfirmationCarleaseFunc = { (transactionID, status) =>
               this.presenter.addCarLeaseConfirmation(transactionID, status)
             }
             onConfirmationReleaseFunc = { (resp) => this.presenter.addCarLeaseConfirmation(resp) }
             fileCarLease = { fileCarLease }
             setFileCarlease = { (file) => this.setFileCarlease(file) }
             showFileReceipt = { response }
             onUploadAttachmentsFunc = { (id, file) => this.presenter.addCarLeasePayment(id, file) }
             uploadImage = { (transactionType, transactionId, file) => {
               this.presenter.uploadTransactionBereavement(transactionType, transactionId, file)
                }
              }
            />
          </div>            :
          <div className = { 'transaction-details-loader' }>
            <center>
              <CircularLoader show = { true }/>
            </center>
          </div>
        }
    </div>
    )
  }
}

export default ConnectPartial(TransactionPersonalDetailsFragment, Presenter)
