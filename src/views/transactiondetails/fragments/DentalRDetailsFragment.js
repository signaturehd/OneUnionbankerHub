import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Card } from '../../../ub-components'
import './styles/detailsFragment.css'
/*
Transaction DentalR
*/
import DentalRDetailsComponent from
  '../../transaction/components/TransactionDetailComponent/TransactionDetailCardComponent'

import TransactionDetailsController from '../controller/TransactionDetailsController'

class DentalRDetailsFragment extends Component {

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
                    <div></div>
                  </div>
                  <div className={ 'transaction-details-grid-row' }>
                    <div></div>
                    <div className = { 'transaction-details-status-grid' }>
                      <div className =
                        { `font-weight-bolder grid-global-row-x3 transaction-details-status-${ detailStatus }` }
                      >
                        <div></div>
                          { benefitLabel }
                        <div></div>
                      </div>
                      <div className = { 'font-size-14px' }>Transaction Status</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>
              <DentalRDetailsComponent
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

DentalRDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  attachmentsMethod : PropTypes.func,
  agreementsMethod : PropTypes.func
}

export default DentalRDetailsFragment
