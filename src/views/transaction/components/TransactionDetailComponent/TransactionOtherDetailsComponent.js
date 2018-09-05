import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/transactionCardComponent.css'
import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
class TransactionOtherDetailsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { procedure } = this.props
  const date = TransactionPersonalFunction.checkedMDYDate(
    procedure &&
    procedure.PreferredSchedule)
  const orDate = TransactionPersonalFunction.checkedMDYDate(
    procedure &&
    procedure.OfficialReceiptDate)
  const number =  procedure && procedure.OfficialReceiptNumber
  const approvedAmount = TransactionPersonalFunction.checkedAmountFormat(
    procedure &&
    procedure.Amount)

  return (
    <div>
      <div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { date !== '(Not Yet Provided)' ? date : orDate }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              { date !== '(Not Yet Provided)' ? 'Preferred Schedule' : 'Official Receipt Date'}
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {number}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Official Receipt Number
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              &#8369; { approvedAmount }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Approved Amount
            </h2>
            <br/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default TransactionOtherDetailsComponent
