import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Accordion from '../components/Accordion'


import { Card } from '../../../ub-components'

import './styles/detailsFragment.css'
/*
Transaction Optical Form Agreement, Form Agreement, & File Attacment
*/
import OpticalDetailsComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import OpticalFileComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import OpticalAgreementComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class OpticalDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, attachments } = this.props
    return (
      <div className = {'details-container'}>
        <center>
          <h2 className = { 'transaction-detail details-bold' }>
            Transaction Information
          </h2>
        </center>
        <br/>
        <div>
      <Accordion>
        <div className="accor">
            <div className="head">Details</div>
            <div className="body">
        <OpticalDetailsComponent
          details = { details }
          transactionsPerson = { transactionsPerson } />
        <br/>
            </div>
        </div>
      <div className="accor">
            <div className="head">Attachments</div>
            <div className="body">
        <OpticalFileComponent
          details = { details }
          attachments = { attachments } />
        <br/>
            </div>
    </div>
      <div className="accor">
            <div className="head">Procedures</div>
            <div className="body">
        <div>
          <center>
            <h2>Amount</h2>
              <br/>
            <h2>&#x20b1; { details && details.details.Amount }</h2>
          </center>
        </div>
        <br/>
          </div>
    </div>
      <div className="accor">
            <div className="head">Notice</div>
            <div className="body">
        <OpticalAgreementComponent details = { details } />
            </div>
      </div>
    </Accordion>
</div>
</div>
    )
  }
}

OpticalDetailsFragment.propTypes = {
  details: PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default OpticalDetailsFragment
