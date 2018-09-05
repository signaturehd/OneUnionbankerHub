import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as MyExistitngLoansFunctions from '../functions/MyExistitngLoansFunctions'

import { Card, GenericButton } from '../../../ub-components'
import './styles/myExistingLoansCardStyle.css'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

class ExistingLoansHistoryCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      existingLoans,
      description,
      amortization,
      balance,
      promissoryNote,
      date,
      totalAmount
    } = this.props

    const convertBalance = MyExistitngLoansFunctions.checkedDesiredAmount(balance)
    const convertDatePresentation = MyExistitngLoansFunctions.checkedMDYDate(date)

    return (
      <div>
        {
          existingLoans.map((resp, key) =>
          <Card className = { 'existing-loans-grid-x6' }>
            <div className = { 'existing-loans-grid-label' }>
              <div className = { 'font-weight-bold font-size-14px' }>
                PN Number
              </div>
              <div>
                { resp.promissoryNote }
              </div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Type</div>
              <div>{ resp.description }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Date</div>
              <div>{ moment(resp.date).format('DD MMM YYYY') }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Principal Amount</div>
              <div>&#8369; { format(resp.balance) }</div>
            </div>
            <div  className = { 'font-weight-bold font-size-14px' }>(progressbar insert here)</div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Outstanding Amount</div>
              <div>
                &#8369; { format(totalAmount) }
              </div>
            </div>
          </Card>
          )
        }
      </div>
    )
  }
}

ExistingLoansHistoryCardComponent.propTypes = {
  description : PropTypes.string,
  amortization : PropTypes.string,
  balance : PropTypes.string,
  promissoryNote : PropTypes.string,
  totalAmount : PropTypes.string,
  date: PropTypes.object
}

export default ExistingLoansHistoryCardComponent
