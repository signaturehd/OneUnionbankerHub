import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/transactionCardComponent.css'

class TransactionProcedureCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { procedure } = this.props
  console.log('success')

  return (
    <div>
      <h2 className = { 'font-weight-bolder' }>
        Procedure
      </h2>
      <br/>
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
    </div>
    )
  }
}

export default TransactionProcedureCardComponent
