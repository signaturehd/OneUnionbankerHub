import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'
import { Card } from '../../ub-components/'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import TransactionCardComponent from './components/TransactionCardComponent/TransactionCardComponent'
import TransactionModal from './modals/TransactionModal'

class TransactionFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      view : false,
      transactionId : null,
      transactions: [],
      transactionResponse : null,
      transaction: null
    }
  }

  componentDidMount () {
    this.presenter.getTransactions()
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
      transactionResponse
    } = this.state

    const {
      onClick,
      text,
      path,
      icon,
      history
    } = this.props

    return (
      <div>
        <h1> Transactions </h1>
        <div className = { '_transaction-container' }>
        {

          transactions &&
          transactions.map((transaction, key) =>
            <TransactionCardComponent
              detail = { transaction } key = { key }
              onClick = { (transaction, view) => this.setState({ transaction, view }) }
            />
          )
        }

        {
          view &&
          <TransactionModal
            transactionResponse = { transactionResponse }
            transaction = { transaction.benefitId }
            presenter = { () => this.presenter.getTransactionById(transaction.id) }
            onClose = { () => this.setState({view : false, transactionResponse: null, transaction: null })}
          />
        }


        </div>
      </div>
    )
  }
}


export default ConnectPartial (TransactionFragment, Presenter)
