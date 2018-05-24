import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'
import { Card, CircularLoader } from '../../ub-components/'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import TransactionCardComponent from './components/TransactionCardComponent/TransactionCardComponent'
import TransactionModal from './modals/TransactionModal'

class TransactionPersonalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      view : false,
      transactionId : null,
      transactions: null,
      transactionResponse : null,
      transaction: null,
    }
  }

  componentDidMount () {
    this.presenter.getTransactionsPersonal()

  }

  transactions (transactions) {
    this.setState({transactions})
  }

  transacitonDetails (transactionResponse) {
    this.setState({transactionResponse})
  }


  render () {
    const {
      transactions,
      view,
      transaction,
      transactionResponse,
    } = this.state

    const {
      onClick,
      text,
      path,
      icon
    } = this.props
    return (
      <div>
      {
        transactions ?
        <div className = { 'transaction-container' }>
          {
            transactions.map((transaction, key) => (
              <TransactionCardComponent
                detail = { transaction } key = { key }
                onClick = { (transaction) =>
                  this.props.history.push(`/mybenefits/transactions/personal/${transaction.id}`) }
              />
            ))
          }
        </div>
        :
        <div className = {'transactions-loader'}>
          <center>
            <CircularLoader show = {true} />
          </center>
        </div>
      }
      </div>
    )
  }
}
export default ConnectPartial (TransactionPersonalFragment, Presenter)
