import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Accordion from '../components/AccordionComponent'


import { Card } from '../../../ub-components'

import './styles/detailsFragment.css'
/*
Transaction DentalR Form Agreement, Form Agreement, & File Attacment
*/
import DentalRDetailsComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'
import DentalRFileComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import DentalRAgreementComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class DentalRDetailsFragment extends Component {
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
            <div className = { 'accor' } >
              <div className = { 'head' } >Details</div>
                <div className = { 'body' } >
                  <DentalRDetailsComponent
                    transactionsPerson = { transactionsPerson }
                    details = { details } />
                  <br/>
              </div>
            </div>
            <div className = { 'accor' } >
              <div className = { 'head' } >Attachments</div>
                <div className = { 'body' } >
                  <DentalRFileComponent
                    details = { details }
                    attachments = { attachments } />
                <br/>
              </div>
            </div>
            <div className = { 'accor' } >
              <div className = { 'head' } >Procedures</div>
                <div className = { 'body' } >
                  <div className = { 'transaction-card-details' }>
                  <center>
                    <h2 className = { 'details-bold' }>
                      Procedures
                    </h2>
                  </center>
                  <br/>
                  {
                    details && details.details.Procedures.map((procedure, key) =>
                      <center key>
                        <h2>{ procedure.Name }</h2>
                        <h2>&#x20b1;{ procedure.Amount }</h2>
                      </center>
                    )
                  }
                </div>
                <br/>
              </div>
            </div>
            <div className = { 'accor' } >
              <div className = { 'head' } >
                Notice
              </div>
              <div className = { 'body' } >
                <DentalRAgreementComponent details = { details } />
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    )
  }
}

DentalRDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default DentalRDetailsFragment
