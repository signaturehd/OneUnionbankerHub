import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Card } from '../../../ub-components'
import './styles/detailsFragment.css'
/*
Transaction DentalR
*/
import EducationDetailsComponent from
  '../../transaction/components/TransactionEducationGroupPlanComponent/EducationDetailsComponent'

import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'

class EducGrantPlanDetailsFragment extends Component {

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
              <div className = { 'transaction-banner transaction-dentalreimbursement' }>
                <div className={ 'transaction-banner-card' }>
                  <div className = { 'text-align-left' }>
                    <h1 className = { 'font-size-30px transaction-details-name font-weight-normal'}>
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
            <br/>
            <div>
              <EducationDetailsComponent
                transactionsPerson = { transactionsPerson }
                details = { details }
                onClickAttachments = { (resp) => attachmentsMethod(resp) }
                onClickAgreements = { (resp) => agreementsMethod(resp) }
              />
            </div>
          </Card>
          <div></div>
        </div>
      )
    }
  }

EducGrantPlanDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  attachmentsMethod : PropTypes.func,
  agreementsMethod : PropTypes.func
}

export default EducGrantPlanDetailsFragment
