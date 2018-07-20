import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

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
              <div className = { 'transaction-banner transaction-optical' }>
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
              <OpticalDetailsComponent
                details = { details }
                transactionsPerson = { transactionsPerson }
              />
            </div>
            <br/>
            <br/>
            <div>
              <OpticalFileComponent
                details = { details }
                attachments = { attachments }
              />
            </div>
            <br/>
            <br/>
            <div className = { 'body' } >
              <OpticalAgreementComponent details = { details } />
            </div>
          </Card>
        <div></div>
      </div>
    )
  }
}

OpticalDetailsFragment.propTypes = {
  details: PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default OpticalDetailsFragment
