import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction DentalR Form Agreement, Form Agreement, & File Attacment
*/
import DentalRDetailsComponent from '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import DentalRFileComponent from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import DentalRAgreementComponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class DentalRDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, attachments } = this.props
    return (
      <div className = {'details-container'}>
        <center><h2 className = { 'transaction-detail details-bold' }>Transaction Information</h2></center>
        <br/>
        <DentalRDetailsComponent
          transactionsPerson = { transactionsPerson }
          details = { details } />
        <br/>
        <DentalRFileComponent details = { details } attachments = { attachments } />
        <br/>
          <Card className = { 'transaction-card-details' }>
            <center><h2 className = { 'details-bold' }>Procedures</h2></center>
            <br/>
            {
              details && details.details.Procedures.map((procedure, key) =>
                <center key>
                  <h2>{ procedure.Name }</h2>
                  <h2>{ procedure.Amount }</h2>
                </center>
              )
            }
          </Card>
          <br/>
        <DentalRAgreementComponent details = { details } />
      </div>
    )
  }
}

DentalRDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default DentalRDetailsFragment
