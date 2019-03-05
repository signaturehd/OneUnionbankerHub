import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Card } from '../../../ub-components'

import './styles/detailsFragment.css'
/*
Transaction DentalLOA
*/
import CarLeaseDetailCardComponent
from '../../transaction/components/TransactionCarLeaseComponent/CarLeaseDetailCardComponent'

import * as TransactionDetailsFunction
from '../../transactiondetails/controller/TransactionDetailsFunction'

class CarLeaseDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    details,
    transactionsPerson,
    attachmentsMethod,
    agreementsMethod,
    onConfirmationCarleaseFunc,
    onUploadAttachmentsFunc,
    setFileCarlease,
    fileCarLease,
    attachments,
    equityAttachments,
    loader,
    onConfirmationReleaseFunc
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
            <div className = { 'transaction-banner transaction-carlease' }>
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
            <CarLeaseDetailCardComponent
              equityAttachments = { equityAttachments }
              attachments = { attachments }
              loader = { loader }
              fileCarLease = { fileCarLease }
              onConfirmationReleaseFunc = { (resp) => onConfirmationReleaseFunc(resp) }
              onConfirmationFunc = { (id, status) => onConfirmationCarleaseFunc(id, status) }
              onUploadAttachments = { (id, file) => onUploadAttachmentsFunc(id, file) }
              transactionsPerson = { transactionsPerson }
              setFileCarlease = { (resp) => setFileCarlease(resp) }
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
CarLeaseDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
  onConfirmationCarleaseFunc : PropTypes.func,
  onUploadAttachmentsFunc : PropTypes.func,
}

export default CarLeaseDetailsFragment
