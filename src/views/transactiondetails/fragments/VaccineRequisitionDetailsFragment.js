import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  GenericButton,
  CircularLoader,
  Modal,
  FileUploader
} from '../../../ub-components'
import './styles/detailsFragment.css'

import VaccineRequisitionDetailComponent from
'../../transaction/components/TransactionVaccineComponent/VaccineRequisitionDetailComponent'
import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'

class VaccineRequisitionDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, agreementsMethod, viewTransactions } = this.props

    const detailStatus = TransactionDetailsFunction.checkedBenefitStatus(details.status)
    const benefitType = TransactionDetailsFunction.checkedBenefitType(details.benefitType)
    const dateFiled = TransactionDetailsFunction.checkedDateFilled(details)
    const benefitLabel = TransactionDetailsFunction.getBenefitLabelStatus(details.status)

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-vaccine' }>
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
            <br/>
            <div>
              <VaccineRequisitionDetailComponent
                details = { details }
                viewTransactions = { (resp) => viewTransactions(resp) }
                onClickAgreements = { (resp) => agreementsMethod(resp) }
              />
            </div>
          </Card>
        <div></div>
      </div>
    )
  }
}
VaccineRequisitionDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default VaccineRequisitionDetailsFragment
