import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import './styles/transaction-details-component.css'

class TransactionFileCardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { transactionDetails } = this.props
    return (
      <Card>
        <h5 className = 'text-title-detail'> FORM ATTACHMENTS </h5>
          {
            transactionDetails &&
            transactionDetails.Attachments.map((file, key) =>
              <div>
                <h6 key = { key } className = 'title' > { file.DocumentType }: { file && file.FileName } </h6>
              </div>
            )
          }
        <h5 className = 'text-title-detail'> PROCEDURES </h5>
        {
          transactionDetails &&
          transactionDetails.Procedures.map((procedure, key) =>
            <h6  key = { key } className = 'title'> { procedure && procedure.Name } </h6>
          )
        }
      </Card>
    )
  }
}

export default TransactionFileCardComponent
