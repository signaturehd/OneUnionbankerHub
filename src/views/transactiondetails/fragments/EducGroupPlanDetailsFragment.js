import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction Education Details,, & File Attacment
*/
import OpticalDetailsComponent from '../../transaction/components/TransactionOpticalCardComponent/TransactionOpticalDetailsComponent'
import OpticalFileComponent from '../../transaction/components/TransactionOpticalCardComponent/TransactionOpticalFileComponent'
/*
Transaction Education Form Agreement
*/
import TransactionFormAgreementCardCOmponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardCOmponent'

class EducGroupPlanDetailsFragment extends Component {
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

EducGroupPlanDetailsFragment.propTypes = {
  details : PropTypes.object
}

export default EducGroupPlanDetailsFragment
