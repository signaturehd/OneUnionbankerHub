import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as MyExistitngLoansFunctions from '../functions/MyExistitngLoansFunctions'

import { Card, GenericButton, Loader } from '../../../ub-components'
import './styles/myExistingLoansCardStyle.css'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"

class ExistingLoansSummaryCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  computePercentage (balance, principal) {
    let totalAmount = this.props.totalAmount
    const percentage = (balance / principal) * 100
    // const percentage = (balance / totalAmount) * 100

    return parseInt(percentage)
  }

  render () {
    const {
      existingLoans,
      description,
      amortization,
      balance,
      totalAmount ,
      promissoryNote,
      date,
      principalAmount
    } = this.props

    const convertBalance = MyExistitngLoansFunctions.checkedDesiredAmount(balance)
    const convertDatePresentation = MyExistitngLoansFunctions.checkedMDYDate(date)


    return (
      <div>
        {
          existingLoans.map((resp, key) =>
          <Card className = { 'existing-loans-grid-x6' }>
            <span  className = { `existing-icon-fixed-${ MyExistitngLoansFunctions.checkIcon(resp.description) }` }/>
            <div className = { 'existing-loans-grid-label' }>
              <div className = { 'font-weight-bold font-size-12px' }>Type</div>
              <div className = { 'font-weight-lighter font-size-12px' }>{ resp.description }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div className = { 'font-weight-bold font-size-12px' }>
                PN Number
              </div>
              <div className = { 'font-weight-lighter font-size-12px' }>
                { resp.promissoryNote }
              </div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-12px' }>Date</div>
              <div className = { 'font-weight-lighter font-size-12px' }>{ moment(resp.date).format('DD MMM YYYY') }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-12px' }>Amortization</div>
              <div className = { 'font-weight-lighter font-size-12px' }>{ resp.amortization }</div>
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-12px' }>Outstanding Balance</div>
              <div className = { 'font-weight-lighter font-size-12px' }>&#8369; { format(resp.balance) }</div>
            </div>
            <div  className = { 'font-weight-bold font-size-12px existingloans-progressbar' }>
              <br/>
              <br/>
              <Progress
                percent = { this.computePercentage(resp.balance, resp.principal) } />
              {
                // <Progress
                //   percent = { this.computePercentage(resp.balance) } />
              }
            </div>
            <div className = { 'existing-loans-grid-label' }>
              <div  className = { 'font-weight-bold font-size-12px' }>Principal Amount</div>
              <div className = { 'font-weight-lighter font-size-12px' }>
                &#8369; { format(resp.principal) }
              </div>
            </div>
          </Card>
          )
        }
      </div>
    )
  }
}

ExistingLoansSummaryCardComponent.propTypes = {
  description : PropTypes.string,
  amortization : PropTypes.string,
  totalAmount  : PropTypes.string,
  balance : PropTypes.string,
  promissoryNote : PropTypes.string,
  date: PropTypes.object
}

export default ExistingLoansSummaryCardComponent
