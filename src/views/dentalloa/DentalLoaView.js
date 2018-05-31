import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalLoaPresenter'
import ConnectView from '../../utils/ConnectView'
import DentalLoaCard from './components/DentalLoaCard'
import DentalLoaBranchModal from './modal/DentalLoaBranchModal'
import DentalLoaDependentModal from './modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from './modal/DentalLoaProcedureModal'
import Notice from '../notice/Notice'
import { CircularLoader, Modal } from '../../ub-components/'
import './styles/dentalloa.css'
class DentalLoaView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      dentalloa : null,
      disabled : false, //Loader
      showProcedureModal : false,//First Modal for Procedures
      showRecipientModal : false, //Display Recipient Modal
      showHealthwayBranchModal : false, //Display HealthWayBranch Modal
      recipient : null,
      procedures : null, //Get Procedures List
      procedure : null,
      secondProcedure : null,
      preferedDate : null, //get Date
      branch : null,
      date : null,
      noticeResp: false,
      noticeResponse: []
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
  submitForm (recipient, branch, date, procedure) {
    const procedureTest = [
      {
        'id' : 4
      },
      {
        'id' : 10
      }
    ]
    this.presenter.addDentalLoa( recipient.id, branch.id, date, procedureTest)
  }

  /* Display Modal Notice of Undertaking*/
  noticeOfUndertaking (resp) {
    this.setState({ noticeResp : resp })
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
      date,
      dentalloa,
      showCircularLoader,
      disabled,
      showHealthwayBranchModal,
      showRecipientModal,
      showProcedureModal,
      recipient,
      recipientText,
      branchId,
      branchText,
      procedure,
      secondProcedure,
      procedures,
      preferedDate,
      noticeResp,
      noticeResponse
    } = this.state

    return(
      <div  className = { 'benefits-container' }>
        {
          noticeResp &&
          <Notice
            onClose = { () => this.setState({ noticeResp : false })}
            noticeResponse = { noticeResponse && noticeResponse }
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
            details = { procedures }
            chosenProcedure = { (procedure) =>
              this.setState({ procedure }) }
            onChange = { (procedure) =>
              this.setState({ procedure }) }
            onClose = { () =>
              this.setState({ showProcedureModal : false }) } />
        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h2 className = { 'header-margin-default' }>Dental Loa Issuance</h2>
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
                getPreferredDate = { (data) => this.setState({ date :  data })}
                submitForm = { () => this.submitForm(recipient, branchId, date, procedure) }
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
