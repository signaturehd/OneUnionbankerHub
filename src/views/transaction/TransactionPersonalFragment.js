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
      transactions: [],
      transactionResponse : null,
      transaction: null,
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
      transactionResponse,
    } = this.state

    const {
      onClick,
      text,
      path,
      icon
    } = this.props

    const TransactionPersonal = () => (
      <div className = { 'transaction-container' }>
        {
          transactions &&
          transactions.map((transaction, key) =>
            <TransactionCardComponent
              detail = { transaction } key = { key }
              onClick = { (transaction, view) => this.setState({ transaction, view })}
            />
          )
        }
      </div>
    )


    return (
      <div>
        {
          view &&
          <TransactionModal
            transactionResponse = { transactionResponse }
            history = { history }
            transaction = { transaction.benefitId }
            presenter = { () => this.presenter.getTransactionById(transaction.id) }
            onClose = { () =>  this.setState({ view : false })}/>
        }


        <Switch>
          <Route path = '/mybenefits/benefits/transaction/personal' render = { TransactionPersonal } />
        </Switch>
    </div>
    )
  }
}
export default ConnectPartial (TransactionPersonalFragment, Presenter)
