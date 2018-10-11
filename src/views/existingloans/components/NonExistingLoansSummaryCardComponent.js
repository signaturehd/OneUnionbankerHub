import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as MyExistitngLoansFunctions from '../functions/MyExistitngLoansFunctions'

import { Card, GenericButton, Loader } from '../../../ub-components'
import './styles/myExistingLoansCardStyle.css'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"

class NonExistingLoansSummaryCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  computePercentage (balance) {
    let totalAmount = this.props.nonTotalAmount
    const percentage = (balance / totalAmount) * 100

    return parseInt(percentage)
  }

  render () {
    const {
      nonExistingLoans,
      nonTotalAmount
    } = this.props

    const convertBalance = MyExistitngLoansFunctions.checkedDesiredAmount(balance)
    const convertDatePresentation = MyExistitngLoansFunctions.checkedMDYDate(date)

    return (
      <div>
        {
          nonExistingLoans.map((resp, key) =>
          <Card className = { 'existing-loans-grid-x6' }>
            <span  className = { `existing-icon-fixed-${ MyExistitngLoansFunctions.checkIcon(resp.description) }` }/>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Type</div>
              <div>{ resp.description }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div className = { 'font-weight-bold font-size-14px' }>
                PN Number
              </div>
              <div>
                { resp.promissoryNoteNumber }
              </div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Date</div>
              <div>{ moment(resp.loanDate).format('DD MMM YYYY') }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Outstanding Balance</div>
              <div>&#8369; { format(resp.outstandingBalance) }</div>
            </div>
            <div  className = { 'font-weight-bold font-size-14px existingloans-progressbar' }>
              <br/>
              <br/>
              <Progress
                percent = { this.computePercentage(resp.outstandingBalance) } />
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-14px' }>Principal Amount</div>
              <div>
                &#8369; { format(nonTotalAmount) }
              </div>
            </div>
          </Card>
          )
        }
      </div>
    )
  }
}

NonExistingLoansSummaryCardComponent.propTypes = {
  nonTotalAmount  : PropTypes.string
}

export default NonExistingLoansSummaryCardComponent
