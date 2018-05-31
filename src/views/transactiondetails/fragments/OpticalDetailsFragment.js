import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction Optical Form Agreement, Form Agreement, & File Attacment
*/
import OpticalDetailsComponent from '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import OpticalFileComponent from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import OpticalAgreementComponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class OpticalDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, attachments } = this.props
    return (
      <div className = {'details-container'}>
        <center><h2 className = { 'transaction-detail details-bold' }>Transaction Information</h2></center>
        <br/>
        <OpticalDetailsComponent
          details = { details }
          transactionsPerson = { transactionsPerson } />
        <br/>
        <OpticalFileComponent details = { details } attachments = { attachments } />
        <br/>
        <Card>
          <center>
            <h2>Amount</h2>
              <br/>
            <h2>&#x20b1; { details && details.details.Amount }</h2>
          </center>
        </Card>
        <br/>
        <OpticalAgreementComponent details = { details } />
      </div>
    )
  }
}

OpticalDetailsFragment.propTypes = {
  details: PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default OpticalDetailsFragment
