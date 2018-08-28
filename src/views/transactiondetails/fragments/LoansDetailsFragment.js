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

import MPLPurposeComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLPurposeComponent'

import * as TransactionDetailsFunction
from '../../transactiondetails/controller/TransactionDetailsFunction'

class LoansDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    details,
    transactionsPerson,
    attachmentsMethod,
    agreementsMethod
  } = this.props

  const detailStatus = TransactionDetailsFunction.checkedBenefitStatus(details.status)
  const benefitType = TransactionDetailsFunction.checkedBenefitType(details.benefitType)
  const dateFiled = TransactionDetailsFunction.checkedDateFilled(details)
  const benefitLabel = TransactionDetailsFunction.getBenefitLabelStatus(details.status)

  return (
    <div className={ 'transaction-details-global-x3' }>
      <div></div>
        <Card>
          <div className={ 'transaction-details-container' }>
            <div className = { 'transaction-banner transaction-mpl' }>
              <div className={ 'transaction-banner-card' }>
                <div className = { 'text-align-left' }>
                   <h1 className = { 'transaction-details-name font-weight-normal'}>
                      { benefitType }
                   </h1>
                   <div></div>
                 </div>
                 <div className={ 'transaction-details-grid-row' }>
                   <div></div>
                   <div className = { 'transaction-details-status-grid' }>
                     <div className =
                       { `font-weight-bolder grid-global-row-x3 transaction-default-status transaction-details-status-${ detailStatus }` }
                       >
                       <div></div>
                         { benefitLabel }
                       <div></div>
                     </div>
                     <div className = { 'font-size-14px' }></div>
                   </div>
                   <div></div>
                 </div>
              </div>
            </div>
          </div>
          <div>
            <MPLDetailsComponent
              transactionsPerson={ transactionsPerson }
              details={ details }
              onClickAttachments = { (resp) => attachmentsMethod(resp) }
              onClickAgreements = { (resp) => agreementsMethod(resp) }
            />
          </div>
          <div>
            <MPLPurposeComponent details={ details } />
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
  attachmentsMethod: PropTypes.func,
  agreementsMethod: PropTypes.func ,
}

export default LoansDetailsFragment
