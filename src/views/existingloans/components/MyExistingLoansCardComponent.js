import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as MyExistitngLoansFunctions from '../functions/MyExistitngLoansFunctions'

import { Card, GenericButton } from '../../../ub-components'
import './styles/myExistingLoansCardStyle.css'

import moment from 'moment'

class MyExistingLoansCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      description,
      amortization,
      balance,
      promissoryNote,
      date
    } = this.props

    const convertBalance = MyExistitngLoansFunctions.checkedDesiredAmount(balance)
    const convertDatePresentation = MyExistitngLoansFunctions.checkedMDYDate(date)

    return (
      <Card className = { 'grid-global-rows  existing-loans-padding-outstanding' }>
        <div className = { 'existing-loans-grid-icons'}>
          <span  className = { 'global-icons-promissoryNote existing-loans-icons' }/>
          <div>
            <div className = { 'text-align-left font-weight-normal font-size-18px' }>
              { description }
            </div>
            <div className = { 'font-size-12px' }> { convertDatePresentation } </div>
          </div>
        </div>
        <div className = { 'grid-global' }>
          <div></div>
          <div>
            <div className = { 'unionbank-color font-weight-normal font-size-12px text-align-right' }>
              Outstanding Balance
            </div>
            <div className = { 'font-size-14px text-align-right' }>
              &#8369; { convertBalance }
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

MyExistingLoansCardComponent.propTypes = {
  description : PropTypes.string,
  amortization : PropTypes.string,
  balance : PropTypes.string,
  promissoryNote : PropTypes.string,
  date: PropTypes.object
}

export default MyExistingLoansCardComponent
