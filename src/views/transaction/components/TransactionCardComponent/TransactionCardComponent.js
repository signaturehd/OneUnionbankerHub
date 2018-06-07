import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Presenter from '../../presenter/TransactionPresenter'
import BaseMVPView from '../../../common/base/BaseMVPView'
import { Card, GenericButton } from '../../../../ub-components'


import './styles/transactionCardComponent.css'

class TransactionCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { detail, onClick } = this.props

    return (
      <Card className = { 'transaction-card'}>
        <div className = {'transaction-header'} >
        </div>
        <div className = {'transaction-body'}>
          <h5>{ detail.benefit }</h5>
          <h3>{detail.status}</h3>
          <h4>{detail.applicationDate}</h4>
        </div>
        <div className = {'transaction-footer'}>
          <center>
            <GenericButton
              text = {'Read More'}
              onClick = { () => onClick(detail, true) }/>
          </center>
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
