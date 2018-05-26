import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'
/*
Transaction DentalR Form Agreement, Form Agreement, & File Attacment
*/
import DentalRDetailsComponent from '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import DentalRFileComponent from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import DentalRAgreementComponent from '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardCOmponent'

class DentalRDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details } = this.props
    return (
      <div className = {'details-container'}>
        <center><h2 className = { 'transaction-detail' }>Transaction Information</h2></center>
        <br/>
        <DentalRDetailsComponent details = { details } />
        <br/>
        <DentalRFileComponent details = { details } />
        <br/>
          <Card>
            <center><h2>Procedures</h2></center>
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
        <TransactionFormAgreementCardCOmponent details = { details } />
      </div>
    )
  }
}

DentalRDetailsFragment.propTypes = {
  details : PropTypes.object
}

export default DentalRDetailsFragment
