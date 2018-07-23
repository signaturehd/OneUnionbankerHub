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

import TransactionDetailsController from '../controller/TransactionDetailsController'

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

    const detailStatus = new TransactionDetailsController().checkedBenefitStatus(details.status)
    const benefitType = new TransactionDetailsController().checkedBenefitType(details.benefitType)
    const dateFiled = new TransactionDetailsController().checkedDateFilled(details)
    const benefitLabel = new TransactionDetailsController().getBenefitLabelStatus(details.status)

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-dentalreimbursement' }>
                <div className={ 'transaction-banner-card' }>
                   <div>
                     <h1 className = { 'transaction-details-name font-weight-normal'}>
                       { benefitType }
                      </h1>
                      <h4 className = { 'transaction-details-name1' }>
                        { dateFiled }
                      </h4>
                   </div>
                   <div className={ 'transaction-details-grid-row' }>
                     <div></div>
                     <div></div>
                     <div className =
                       { `font-weight-bolder transaction-details-status-${ detailStatus }` }
                      >
                        Transaction Status: { benefitLabel }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <br/>
            <div>
              <DentalRDetailsComponent
                transactionsPerson = { transactionsPerson }
                details = { details }
              />
            </div>
            <br/>
            <div>
              <DentalRFileComponent
                details = { details }
                attachments = { attachments }
              />
            </div>
            <br/>

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
