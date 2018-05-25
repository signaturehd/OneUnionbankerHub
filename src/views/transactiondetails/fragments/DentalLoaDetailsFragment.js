import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction Optical Details, Form Agreement
*/
import OpticalDetailsComponent from '../../transaction/components/TransactionOpticalCardComponent/TransactionOpticalDetailsComponent'
import OpticalFileComponent from '../../transaction/components/TransactionOpticalCardComponent/TransactionOpticalFileComponent'
/*
Transaction Medical Details, Form Agreement, & File Attacment
*/
import TransactionFormAgreementCardCOmponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardCOmponent'

class DentalLoaDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details } = this.props
    return (
      <div className = {'optical-details-container'}>
        <center><h2 className = { 'transaction-detail' }>Transaction Information</h2></center>
        <br/>
        <OpticalDetailsComponent details = { details } />
        <br/>
        <OpticalFileComponent details = { details } />
        <br/>
        <TransactionFormAgreementCardCOmponent details = { details } />
      </div>
    )
  }
}
DentalLoaDetailsFragment.propTypes = {
  details : PropTypes.object
}

export default DentalLoaDetailsFragment
