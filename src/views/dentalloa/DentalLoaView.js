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
      branch : null,
      date : null,
    }
    this.getDentalLoa = this.getDentalLoa.bind(this)
  }

  componentWillMount () {
    this.presenter.getDentalLoa()
  }

  getDentalLoa (dentalloa) {
      this.setState({ dentalloa })
  }

  hideCircularLoader ( disabled ) {
    this.setState({ disabled : false})
  }

  showCircularLoader ( disabled ) {
    this.setState({ disabled : true})
  }

  navigate () {
      this.props.history.push('/benefits/medical')
  }
  render () {
    const { details } = this.props

    const {
      dentalloa,
      showCircularLoader,
      disabled,
      showHealthwayBranchModal,
      showRecipientModal,
      showProcedureModal,
      receipient,
      dependent,
      procedure,
    } = this.state

    return(
      <div  className = { 'benefits-container' }>
        {
          showRecipientModal &&
          <DentalLoaDependentModal
            details = { dentalloa.dependents }
            onChange = { (receipient, procedure) => this.setState({ receipient, procedure }) }
            onClose = { () => this.setState({ showRecipientModal : false }) } />
        }

        {
          showHealthwayBranchModal &&
          <DentalLoaBranchModal
            showHealthwayBranchModal = { showHealthwayBranchModal }
            details = { dentalloa.branches }
            onChange = { (branch) => this.setState({ branch }) }
            onClose = { () => this.setState({ showHealthwayBranchModal : false }) } />
        }

        {
          showProcedureModal &&
          <DentalLoaProcedureModal
            showProcedureModal = { showProcedureModal }
            details = { dentalloa.procedures }
            onChange = { (procedure) => this.setState({ procedure }) }
            onClose = { () => this.setState({ showProcedureModal : false }) } />
        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Dental Loa Issuance</h1>
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
                presenter = { this.presenter }
                receipient = { receipient }
                procedure = { procedure }
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
