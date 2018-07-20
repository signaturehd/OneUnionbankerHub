import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import './styles/detailsFragment.css'
import { Card } from '../../../ub-components'
/*
Transaction MPL Form Agreement, Form Agreement, & File Attacment
content - TransactionMPLDetailComponent
*/
import MPLDetailsComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLDetailsComponent'
import MPLFileComponent
from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import MPLAgreementComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLFormAgreementComponent'
import MPLPurposeComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLPurposeComponent'

class LoansDetailsFragment extends Component {

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
              <div className = { 'transaction-banner transaction-mpl' }>
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
              <MPLDetailsComponent
                transactionsPerson={ transactionsPerson }
                details={ details }
              />
            </div>
            <br/>
            <br/>
            <div>
              <MPLPurposeComponent details={ details } />
            </div>
            <br/>
            <br/>
            <div>
              <MPLFileComponent
                 details={ details }
                 attachments={ attachments } />
            </div>
            <br/>
            <br/>
            <div>
              <MPLAgreementComponent details={ details } />
            </div>
            <br/>
            <br/>
          </Card>
        <div></div>
      </div>
    )
  }
}

LoansDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
}

export default LoansDetailsFragment
