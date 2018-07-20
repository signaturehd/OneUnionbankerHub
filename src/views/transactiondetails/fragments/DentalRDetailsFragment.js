import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

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
    const {
      details,
      transactionsPerson,
      attachments
    } = this.props

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-dentalreimbursement' }>
                <div className={ 'transaction-banner-card' }>
                   <div>
                     <h1 className = { 'transaction-details-name font-weight-normal'}>
                       {
                         details &&
                         details.benefitType &&
                         details.benefitType.name ?
                         details.benefitType.name :
                         '(Not Yet Provided)'
                       }
                      </h1>
                      <h4 className = { 'transaction-details-name1' }>
                        { details && moment(details.dateFiled).format('dddd, MMMM d, YYYY, h:MM:ss A') }
                      </h4>
                   </div>
                   <div className={ 'transaction-details-grid-row' }>
                     <div></div>
                     <div className = { 'transaction-details-status font-weight-bold' }>
                        {
                          details &&
                          details.status.name ?
                          details.status.name :
                          '(Not Yet Provided)'
                        }
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <div>
              <DentalRDetailsComponent
                transactionsPerson = { transactionsPerson }
                details = { details }
              />
            </div>
            <br/>
            <br/>
            <div>
              <DentalRFileComponent
                details = { details }
                attachments = { attachments }
              />
            </div>
            <br/>
            <br/>
            <div>
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
          </Card>
        <div></div>
      </div>
    )
  }
}

DentalRDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default DentalRDetailsFragment
