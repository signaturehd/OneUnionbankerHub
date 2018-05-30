import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalLoaPresenter'
import ConnectView from '../../utils/ConnectView'
import DentalLoaCard from './components/DentalLoaCard'
import DentalLoaBranchModal from './modal/DentalLoaBranchModal'
import DentalLoaDependentModal from './modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from './modal/DentalLoaProcedureModal'
import { CircularLoader } from '../../ub-components/'
import './styles/dentalloa.css'
class DentalLoaView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      dentalloa : null,
      disabled : false,
      showProcedureModal : false,
      showRecipientModal : false,
      showHealthwayBranchModal : false,
      receipient : null,
      procedures : null,
      procedure : null,
      branch : null,
      date : null,
    }
    this.getDentalLoa = this.getDentalLoa.bind(this)
  }

  componentWillMount () {
    this.presenter.getDentalLoa()
    /*
    temp
    */
    this.presenter.addDentalLoa()
  }
  /*
    Get Data from DentalLOA
  */
  getDentalLoa (dentalloa) {
      this.setState({ dentalloa })
  }

  hideCircularLoader ( disabled ) {
    this.setState({ disabled : false})
  }

  showCircularLoader ( disabled ) {
    this.setState({ disabled : true})
  }
  /*
    Submission of DentalLOA Form
  */
  submitForm (receipientId, branchId, preferedDate, procedures) {
    const procedure = [{
        "id": 4
      },
      {
        "id": 10
    }]
    this.presenter.addDentalLoa(receipientId, branchId, preferedDate, procedures)
  }

  navigate () {
      this.props.history.push('/benefits/medical')
  }
  render () {
    const { details, chosenBranch } = this.props

    const {
      dentalloa,
      showCircularLoader,
      disabled,
      showHealthwayBranchModal,
      showRecipientModal,
      showProcedureModal,
      receipientId,
      receipientText,
      branchId,
      branchText,
      procedure,
      procedures,
      preferedDate,
    } = this.state
    console.log(procedure)

    return(
      <div  className = { 'benefits-container' }>
        {
          showRecipientModal &&
          <DentalLoaDependentModal
            details = { dentalloa }
            chosenDependent = { (receipientId, receipientText, procedures, showReceipientModal) => this.setState({receipientId, receipientText, procedures, showReceipientModal}) }
            onClose = { () => this.setState({ showRecipientModal : false }) } />
        }

        {
          showHealthwayBranchModal &&
          <DentalLoaBranchModal
            showHealthwayBranchModal = { showHealthwayBranchModal }
            details = { dentalloa.branches }
            chosenBranch = { (branchId, branchText, showHealthwayBranchModal) => this.setState({branchId, branchText, showHealthwayBranchModal}) }
            onChange = { (branchId, branchText) => this.setState({ branchId, branchText }) }
            onClose = { () => this.setState({ showHealthwayBranchModal : false }) } />
        }

        {
          showProcedureModal &&
          <DentalLoaProcedureModal
            showProcedureModal = { showProcedureModal }
            details = { procedures }
            onChange = { (procedure) => this.setState({ procedure }) }
            onClose = { () => this.setState({ showProcedureModal : false }) } />
        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h2 classNmae = { 'header-margin-default' }>Dental Loa Issuance</h2>
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
                receipient = { receipientText }
                procedure = { procedure }
                branch = { branchText }
                submitForm = { () => this.submitForm(receipientId, branchId, preferedDate, procedures) }
                onClick = {
                  (showRecipientModal, showHealthwayBranchModal, showProcedureModal) =>
                  this.setState({ showRecipientModal, showHealthwayBranchModal, showProcedureModal })
                }
              />
            }

         </div>
      </div>
    )
  }
}

export default ConnectView(DentalLoaView, Presenter)
