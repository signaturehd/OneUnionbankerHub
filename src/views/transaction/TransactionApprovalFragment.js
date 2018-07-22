import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'
import { Card, CircularLoader } from '../../ub-components/'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import TransactionCardComponent from './components/TransactionCardComponent/TransactionCardComponent'

class TransactionApprovalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      view : false,
      transactionId : null,
      transactions: null,
      transactionResponse : null,
      transaction: null,
      searchString : '',
    }
  }

  updateSearch (e) {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }

  componentDidMount () {
    this.presenter.getTransactionsApproval()
  }

  transactions (transactions) {
    this.setState({ transactions })
  }

  transacitonDetails (transactionResponse) {
    this.setState({ transactionResponse })
  }


  render () {
    const {
      transactions,
      view,
      transaction,
      transactionResponse,
    } = this.state
    let newTrans = transactions
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      newTrans = transactions.filter(transactions =>  transactions.benefit.toLowerCase().match(search) ||
      transactions.referenceNumber.toLowerCase().match(search))
    }

    const {
      onClick,
      text,
      path,
      icon
    } = this.props

    return (
      <div>
        <input type = 'text'
          className = 'transSearchBar'
          ref='search'
          placeholder = {'Search Transactions'}
          value = { this.state.searchString }
          onChange = { this.updateSearch } />
      {
        transactions ?
        <div className = { 'transaction-container' }>
          {
            newTrans &&
            newTrans.map((transaction, key) => (
              <TransactionCardComponent
                detail = { transaction }
                key = { key }
                onClick = { transaction =>
                  this.props.history.push(`/mybenefits/transactions/approval/${transaction.id}`) }
              />
            ))
          }
        </div>        :
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
export default ConnectPartial (TransactionApprovalFragment, Presenter)
