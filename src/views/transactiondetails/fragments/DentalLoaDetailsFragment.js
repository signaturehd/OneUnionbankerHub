import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction DentalLOA Form Agreement, Form Agreement, & File Attacment
*/
import DentalLOADetailsComponent from '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import DentalLOAFileComponent from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import DentalLOAgreementComponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class DentalLoaDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson } = this.props
    return (
      <div className = {'details-container'}>
        <center><h2 className = { 'transaction-detail details-bold' }>Transaction Information</h2></center>
        <br/>
        <DentalLOADetailsComponent
          details = { details }
          transactionsPerson = { transactionsPerson }/>
        <br/>
        <DentalLOAFileComponent details = { details } />
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
        <DentalLOAgreementComponent details = { details } />
      </div>
    )
  }
}
DentalLoaDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default DentalLoaDetailsFragment