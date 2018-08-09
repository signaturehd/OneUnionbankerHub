import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalLoaPresenter'
import ConnectView from '../../utils/ConnectView'
import DentalLoaCard from './components/DentalLoaCard'
import DentalLoaBranchModal from './modal/DentalLoaBranchModal'
import DentalLoaDependentModal from './modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from './modal/DentalLoaProcedureModal'
import Notice from '../notice/Notice'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import ResponseModal from '../notice/NoticeResponseModal'
import { CircularLoader, Modal } from '../../ub-components/'
import './styles/dentalloa.css'

import { RequiredValidation, Validator, MoneyValidation } from '../../utils/validate'


import { NotifyActions } from '../../actions'
import store from '../../store'

import * as DentalLoaFunction from './function/DentalLoaFunction'

import moment from 'moment'

class DentalLoaView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      recipientErrorMessage: '',
      healthwayBranchErrorMessage: '',
      dateErrorMessage: '',
      errorMessageRequiredProcedure: '',
      preferredDate: '',
      dentalloa : null, /* Dental LOA details*/
      disabled : false, /* Loader Change State*/
      showProcedureModal : false,/* First Modal for Procedures*/
      showRecipientModal : false, /* Display Recipient Modal*/
      showHealthwayBranchModal : false, /* Display HealthWayBranch Modal*/
      showBenefitFeedbackModal : false,
      showNoticeResponseModal: false, /* Display Notice Response Modal*/
      showNoticeResponseApprovalModal : false,/* Display Notice Approval Response Modal*/
      showEditSubmitButton : false,
      titleChange : true,
      recipient : null,
      procedures : null, /* Get Procedures List*/
      procedure : null,
      branch : null, /* Get Branch List*/
      date : null,
      noticeResponse: [],
      selectedProcedures : [] /* Selected Procedures */
    }
    this.getDentalLoa = this.getDentalLoa.bind(this)
    this.dateFunc = this.dateFunc.bind(this)
    this.validator = this.validator.bind(this)
  }

  /* store the date */
  dateFunc (data) {
    this.setState({ preferredDate: data.format('MM-DD-YYYY') })
  }

  validator (input) {
    return new RequiredValidation().isValid(input)
  }

  componentWillMount () {
    this.presenter.getDentalLoa()
    this.props.setSelectedNavigation(1)
  }
  /*
    Get Data from DentalLOA
  */
  getDentalLoa (dentalloa) {
      this.setState({ dentalloa })
  }
  /* Show and Hide Loader */
  hideCircularLoader (disabled) {
    this.setState({ disabled : false })
  }

  showCircularLoader (disabled) {
    this.setState({ disabled : true })
  }

  validateRequired (e) {
    return DentalLoaFunction.checkedValidateInput(e)
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  /*
    Submission of DentalLOA Form
  */
  submitForm () {
    const {
      recipient,
      branchId,
      preferredDate,
      selectedProcedures
    } = this.state

    this.presenter.addDentalLoa(
     recipient.id,
     branchId.id,
     moment(preferredDate).format('MM/DD/YYYY'),
     selectedProcedures)
  }

  showFormReviewFieldDisabled (e) {
    const {
      recipient,
      branchText,
      preferredDate,
      selectedProcedures
    } = this.state

    if(!this.validateRequired(recipient)) {
     this.setState({ recipientErrorMessage : 'Please select your Recipient' })
   } else if (!this.validateRequired(branchText)) {
      this.setState({ healthwayBranchErrorMessage : 'Please select your Healthway Branch' })
    } else if (!this.validateRequired(preferredDate)) {
      this.setState({ dateErrorMessage : 'Please provide the date of occurence' })
    } else if (selectedProcedures.length===0) {
      this.setState({ errorMessageRequiredProcedure : 'Please select a procedure' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
    }
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
    const { details, chosenBranch, chosenDependent, onClose } = this.props

    const {
      dentalloa,
      showProcedureModal,
      showCircularLoader,
      showRecipientModal,
      showHealthwayBranchModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showNoticeResponseApprovalModal,
      showEditSubmitButton,
      recipientErrorMessage,
      healthwayBranchErrorMessage,
      dateErrorMessage,
      errorMessageRequiredProcedure,
      recipient,
      procedures,
      procedure,
      disabled,
      recipientText,
      branchId,
      branchText,
      response,
      date,
      preferredDate,
      noticeResponse,
      selectedProcedures,
      titleChange
    } = this.state
    return (
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
              this.setState({ showNoticeResponseModal : false,  showBenefitFeedbackModal : true })
            }}
            noticeResponse = { response }
          />
        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId = { '7' }
            onClose = { () => {
              this.navigate(),
              this.setState({ showBenefitFeedbackModal : false })
            }}
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
              showReceipientModal }
            )
          }
          dependentProcedure = { procedures =>
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
              this.setState({ branchId, branchText, showHealthwayBranchModal }) }
            onChange = { (branchId, branchText) =>
              this.setState({ branchId, branchText }) }
            onClose = { () =>
              this.setState({ showHealthwayBranchModal : false }) } />
        }
        {
          showProcedureModal &&
          <DentalLoaProcedureModal
            selectedProcedure = { selectedProcedures }
            showProcedureModal = { showProcedureModal }
            onSubmit = { procedure => {
              const updatedProcedures = [...selectedProcedures]

              updatedProcedures.push(procedure)

              this.setState({ selectedProcedures: updatedProcedures })
            }}
            details = { procedures ? procedures : [] }
            onChange = { procedure =>
              this.setState({ procedure }) }
            onClose = { () => this.setState({ showProcedureModal : false }) }/>
        }
      <div>
        <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) } />
        {
          titleChange ?
          <h2 className = { 'header-margin-default' }>
            Dental LOA Issuance
          </h2>
          :
          <h2 className = { 'header-margin-default' }>
            Form Summary
          </h2>
        }
      </div>
      <div className = { 'dentalloa-container' }>
      {
        disabled ?
        <center className = { 'dentalloa-loader' }>
          <CircularLoader show = {this.state.disabled}/>
        </center>       :
        <DentalLoaCard
          details = { dentalloa }
          recipient = { recipientText }
          procedure = { procedure }
          branch = { branchText }
          preferredDate = { preferredDate }
          selectedProcedures = { selectedProcedures }
          showEditSubmitButton = { showEditSubmitButton }
          recipientErrorMessage = { recipientErrorMessage }
          healthwayBranchErrorMessage = { healthwayBranchErrorMessage }
          dateErrorMessage = { dateErrorMessage }
          errorMessageRequiredProcedure = { errorMessageRequiredProcedure }
          dateFunc = { (resp) => this.dateFunc(resp) }
          editFormDataFunc = { (resp) => this.editFormReview(resp) }
          onSubmitFunc = { () => this.submitForm() }
          showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
          onClick = { (
            showRecipientModal,
            showHealthwayBranchModal,
            showProcedureModal) =>
            this.setState({
              showRecipientModal,
              showHealthwayBranchModal,
              showProcedureModal
            })
          }
        />
      }
      </div>
    </div>
    )
  }
}

DentalLoaView.propTypes = {
  details : PropTypes.object,
  onClick : PropTypes.func,
  chosenBranch : PropTypes.func,
  chosenDependent : PropTypes.func,
}

export default ConnectView(DentalLoaView, Presenter)
