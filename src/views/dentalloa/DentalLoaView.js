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
      showHealthwayBranchModal : false
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
      showProcedureModal
    } = this.state

    return(
      <div  className = { 'benefits-container' }>
        {
          showRecipientModal &&
          <DentalLoaDependentModal
            details = { dentalloa.dependents }
            onClose = { () => this.setState({ showRecipientModal : false }) } />
        }

        {
          showHealthwayBranchModal &&
          <DentalLoaBranchModal
            showHealthwayBranchModal = { showHealthwayBranchModal }
            details = { dentalloa.branches }
            onClose = { () => this.setState({ showHealthwayBranchModal : false }) } />
        }

        {
          showProcedureModal &&
          <DentalLoaProcedureModal
            showProcedureModal = { showProcedureModal }
            details = { dentalloa.procedures }
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
