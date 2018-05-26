import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction MPL Form Agreement, Form Agreement, & File Attacment
*/
import MPLDetailsComponent from '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import MPLFileComponent from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import MPLAgreementComponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class LoansDEtailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details } = this.props
    return (
      <div className = {'optical-details-container'}>
        <center><h2 className = { 'transaction-detail' }>Transaction Information</h2></center>
        <br/>
        <MPLDetailsComponent details = { details } />
        <br/>
        <MPLFileComponent details = { details } />
        <br/>
        <MPLAgreementComponent details = { details.details } />
      </div>
    )
  }
}

LoansDEtailsFragment.propTypes = {
  details : PropTypes.object
}

export default LoansDEtailsFragment
