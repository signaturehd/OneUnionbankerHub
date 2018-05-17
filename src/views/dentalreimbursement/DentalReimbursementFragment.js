import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalReimbursementPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/DentalReimbursementCard'
import './styles/dentalreimbursement.css'

class DentalReimbursementFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  navigate () {
      this.props.history.push('/benefits/medical')
  }

  getDentalReimbursement (dentalreimbrsement) {
    console.log(dentalreimbursement)
  }

  render () {
    return (
      <div  className = { 'benefits-container' }>
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Dental Reimbursement</h1>
        </div>
          <div className = { 'dentalreimbursement-container' }>
            <Card/>
          </div>
      </div>
    )
  }
}

export default ConnectView(DentalReimbursementFragment, Presenter)
