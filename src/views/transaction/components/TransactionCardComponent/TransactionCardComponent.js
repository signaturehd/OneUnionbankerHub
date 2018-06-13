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
    const { detail, onClick } = this.props

    return (
      <Card className = { 'transaction-card'}>
      <div className = {'column'}>
        <div className = {'transaction-header'} >
        </div>
        <div className = { 'transaction-body' }>
          <h5 className = { 'transaction-title' }>{ detail.benefit }</h5>
          <h3 className = { 'transaction-status' }>{detail.status}</h3>
          <h4 className = { 'transaction-date' }>{moment(detail.applicationDate).format('MMMM d, YYYY')}</h4>
        </div>
      </div>
      <div className = {'column'}>
        <div className = {'transaction-footer'}>
          <center>
            <GenericButton className = {'trans-button'}
              text = {'View Details'}
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
}

export default TransactionCardComponent
