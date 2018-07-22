import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Presenter from '../../presenter/TransactionPresenter'
import BaseMVPView from '../../../common/base/BaseMVPView'
import { Card, GenericButton } from '../../../../ub-components'
import moment from 'moment'

import './styles/transactionCardComponent.css'

class TransactionCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { detail, onClick, className } = this.props

    return (
      <Card className = { 'transaction-component' }>
        <div>
          <div className = { 'text-align-justify' }>
            <br/>
            <h4>
              { detail.benefit }
            </h4>
            <h4>
              { detail.referenceNumber }
            </h4>
            <h4 className = { 'transaction-component-date' }>
              {
                moment(detail.applicationDate).format('MMMM DD, YYYY')
              }
            </h4>
          </div>
          <div>
              <center>
                <GenericButton
                  text={ detail.status }
                />
                <GenericButton className = { 'transaction-component-button' }
                  text = { 'View Details' }
                  onClick = { () => onClick(detail, true) }/>
              </center>
          </div>
        </div>
      </Card>
    )
  }
}

TransactionCardComponent.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  className : PropTypes.string,
}

export default TransactionCardComponent
