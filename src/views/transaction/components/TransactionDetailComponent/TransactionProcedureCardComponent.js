import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/transactionCardComponent.css'
import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
class TransactionProcedureCardComponent extends Component {
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

  return (
    <div>
      <h2 className = { 'font-weight-bolder' }>
        Procedure
      </h2>
      <br/>
      <div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { 'transaction-card-icon-settings global-icons-procedure' }>
          </span>
          {
            procedure &&
            procedure.Procedures.map((procedure, key) =>
              <div key = { key }>
                <div>
                  <h2>{ procedure.Name ? procedure.Name : '(Not Yet Provided)' }</h2>
                </div>
                <div>
                  <h2>&#8369; { procedure.Amount ? procedure.Amount : '(Not Yet Provided)' }</h2>
                </div>
              </div>
            )
          }
        </div>
        <br/>
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
        {
          number &&
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
        }
      </div>
    </div>
    )
  }
}

export default TransactionProcedureCardComponent
