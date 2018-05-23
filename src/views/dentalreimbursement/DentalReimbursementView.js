import React from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/DentalReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'
import DentalReimbursementReviewModal from './modal/DentalReimbursementReviewModal'
import DentalReimbursementProcedureModal from './modal/DentalReimbursementProcedureModal'

import Card from './components/DentalReimbursementCard'
import './styles/dental-reimbursement.css'

import { CircularLoader } from '../../ub-components/'

class DentalReimbursementView extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      details : [],
      disabled: false,
      getDentalReimbursement: false,
    }
  }

  componentDidMount () {
    this.presenter.getDentalReimbursement()
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
  getDentalReimbursement ( details ) {
    this.setState({ details })
  }

  render () {
    const {
      details,
      showCircularLoader,
      disabled,
      proceedModal,
      reviewModal,
    } = this.state

    return (
      <div  className = { 'benefits-container' }>
        { super.render() }

        {
          proceedModal &&
          <DentalReimbursementProcedureModal
            show = { this.state.proceedModal }
            presenter = { this.presenter }
            details = { details && details.procedures }
            onClose = { () => this.setState({ proceedModal : false }) } />
        }

        {
          reviewModal &&
          <DentalReimbursementProcedureModal
            show = { this.state.proceedModal }
            presenter = { this.presenter }
            details = { details && details.procedures }
            onClose = { () => this.setState({ proceedModal : false }) } />
        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h4>Dental Reimbursement</h4>
        </div>
          <div className = { 'dentalreimbursement-container' }>
            {
              disabled ?
               <center className = { 'dentalloa-loader' }>
                  <CircularLoader show = {this.state.disabled}/>
               </center>
               :
               <Card
                 details = { details }
                 presenter = { this.presenter }/>
            }
          </div>
      </div>
    )
  }
}

export default ConnectView(DentalReimbursementView, Presenter)
