import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, CircularLoader } from '../../../../ub-components/'

class TransactionFileCardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details, attachments } = this.props
    console.log(attachments)
    return (
      <Card className = { 'transaction-card-details' }>
        <center><h4 className = { 'details-bold' }> Attachments </h4></center>
          {
            attachments ?
              <div className = { 'transaction-attachments-container' }>
                {
                  attachments.map((image, key) => (
                    <img
                      className = { 'transaction-attachments _img-ub-logo' }
                      src={image}/>
                  ))
                }
              </div>
              :
              <center>
                <br/>
                <br/>
                  <CircularLoader show={true}/>
                <br/>
                <br/>
              </center>
          }

      </Card>
    )
  }
}

export default TransactionFileCardComponent
