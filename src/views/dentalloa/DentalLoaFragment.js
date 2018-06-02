import React, { Component } from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalLoaPresenter'
import ConnectView from '../../utils/ConnectView'
import DentalLoaCard from './components/DentalLoaCard'
import DentalLoaBranchModal from './modal/DentalLoaBranchModal'
import DentalLoaDependentModal from './modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from './modal/DentalLoaProcedureModal'
import Notice from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import { CircularLoader, Modal } from '../../ub-components/'
import './styles/dentalloa.css'

class DentalLoaView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      dentalloa : null, /*Dental LOA details*/
      disabled : false, /*Loader Change State*/
      showProcedureModal : false,/*First Modal for Procedures*/
      showRecipientModal : false, /*Display Recipient Modal*/
      showHealthwayBranchModal : false, /*Display HealthWayBranch Modal*/
      showNoticeResponseModal: false, /* Display Notice Response Modal*/
      showNoticeResponseApprovalModal : false,/* Display Notice Approval Response Modal*/
      recipient : null,
      procedures : null, /*Get Procedures List*/
      procedure : null,
      branch : null, /* Get Branch List*/
      date : null,
      noticeResponse: [],
      selectedProcedures : [] /* Selected Procedures */
    }
    this.getDentalLoa = this.getDentalLoa.bind(this)
  }

  componentWillMount () {
    this.presenter.getDentalLoa()
  }
  /*
    Get Data from DentalLOA
  */
  getDentalLoa (dentalloa) {
      this.setState({ dentalloa })
  }
  /* Show and Hide Loader */
  hideCircularLoader ( disabled ) {
    this.setState({ disabled : false})
  }

  showCircularLoader ( disabled ) {
    this.setState({ disabled : true})
  }
  /*
    Submission of DentalLOA Form
  */
  submitForm (recipient, branch, date, selectedProcedures) {
    const procedures = []
    const selectedProcedureIds =  [...selectedProcedures]
      selectedProcedures.map((resp) =>
        procedures.push({'id' : resp.id.toString()})
      )
    this.presenter.addDentalLoa( recipient.id, branch.id, date, procedures)
  }

  /* Display Modal Notice of Undertaking*/
  noticeOfUndertaking (resp) {
    this.setState({ showNoticeResponseModal : resp })
  }
  noticeOfUndertakingForm (respForm) {
    this.setState({ noticeResponse : respForm })
  }

  /* navigate method, go back to MyBenefits*/
  navigate () {
      this.props.history.push('/mybenefits/benefits/medical')
  }

  render () {
    const { details, chosenBranch, onClose } = this.props

    const {
      dentalloa,
      showProcedureModal,
      showCircularLoader,
      showRecipientModal,
      showHealthwayBranchModal,
      showNoticeResponseModal,
      showNoticeResponseApprovalModal,
      recipient,
      procedures,
      procedure,
      disabled,
      recipientText,
      branchId,
      branchText,
      response,
      date,
      noticeResponse,
      selectedProcedures
    } = this.state

    return(
      <div  className = { 'benefits-container' }>
        {
          showNoticeResponseModal &&
          <Notice
            onClose = { () => this.setState({ noticeResp : false })}
            benefitId = { '7' }
            noticeResponse = { noticeResponse }
            onDismiss = { (showNoticeResponseModal, response) =>
              this.setState({ showNoticeResponseModal, response, showNoticeResponseApprovalModal : true })  }
            />
        }
        {
          showNoticeResponseApprovalModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false })
              this.props.history.push('/mybenefits/benefits/medical')
            }}
            noticeResponse = { response }
            benefitId = { '7' }
            onDismiss = { (showNoticeResponseApprovalModal, response) =>
              this.setState({ showNoticeResponseApprovalModal, response })  }
          />
        }
        {
          showRecipientModal &&
          <DentalLoaDependentModal
            details = { dentalloa }
            chosenDependent = { (
              recipient,
              recipientText,
              showReceipientModal) => this.setState({
              recipient,
              recipientText,
              showReceipientModal}
            )
          }
          dependentProcedure = { (procedures) =>
            this.setState({ procedures })}
          onClose = { () =>
            this.setState({ showRecipientModal : false }) } />
        }
        {
          showHealthwayBranchModal &&
          <DentalLoaBranchModal
            showHealthwayBranchModal = { showHealthwayBranchModal }
            details = { dentalloa.branches }
            chosenBranch = { (branchId, branchText, showHealthwayBranchModal) =>
              this.setState({branchId, branchText, showHealthwayBranchModal}) }
            onChange = { (branchId, branchText) =>
              this.setState({ branchId, branchText }) }
            onClose = { () =>
              this.setState({ showHealthwayBranchModal : false }) } />
        }
        {
          showProcedureModal &&
          <DentalLoaProcedureModal
            showProcedureModal = { showProcedureModal }
            onSubmit = { procedure => {
              const updatedProcedures = [...selectedProcedures]

              updatedProcedures.push(procedure)

              this.setState({ selectedProcedures: updatedProcedures })
            }}
            details = { procedures ? procedures : [] }
            onChange = { (procedure) =>
              this.setState({ procedure }) }
            onClose = { () => this.setState({ showProcedureModal : false }) }/>
        }
      <div className={ 'breadcrumbs-container' }>
        <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
        <h2 className = { 'header-margin-default' }>DENTAL LOA ISSUANCE</h2>
      </div>
        <div className = { 'dentalloa-container' }>
        {
          disabled ?
          <center className = { 'dentalloa-loader' }>
            <CircularLoader show = {this.state.disabled}/>
          </center>
         :
          <DentalLoaCard
            details = { dentalloa }
            recipient = { recipientText }
            procedure = { procedure }
            branch = { branchText }
            selectedProcedures = { selectedProcedures }
            getPreferredDate = { (data) => this.setState({ date :  data })}
            submitForm = { () => this.submitForm(recipient, branchId, date, selectedProcedures ) }
            onClick = { (
              showRecipientModal,
              showHealthwayBranchModal,
              showProcedureModal) =>
              this.setState( {
                showRecipientModal,
                showHealthwayBranchModal,
                showProcedureModal
              } )
            }
          />
        }
       </div>
    </div>
    )
  }
}

export default ConnectView(DentalLoaView, Presenter)
