import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'
import { Card, CircularLoader, GenericButton } from '../../ub-components/'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'

import TransactionCardComponent
from './components/TransactionCardComponent/TransactionCardComponent'

class TransactionPersonalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      view : false,
      transactionId : null,
      transactions: null,
      transactionResponse : null,
      transaction: null,
      searchString : '',
      index: 100,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
    this.presenter.getTransactionsPersonal()
  }

  updateSearch (e) {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }

  transactions (transactions) {
    this.setState({ transactions })
  }

  transacitonDetails (transactionResponse) {
    this.setState({ transactionResponse })
  }

  handleClick = () => {
   let i = this.state.index < this.state.transactions.length ? this.state.index += 4 : 4
   this.setState({ index: i })
 }

  render () {
    const {
      transactions,
      view,
      transaction,
      transactionResponse,
      index
    } = this.state
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      this.state.transactions = transactions.filter(transactions =>  transactions.benefit.toLowerCase().match(search) ||
      transactions.referenceNumber.toLowerCase().match(search))
    }

    const {
      onClick,
      text,
      path,
      icon
    } = this.props

    return (
      <div className = { 'transaction-details-personal-grid-row' }>
        <div className = { 'grid-global' }>
          <div></div>
          <div>
            <input type = { 'text' }
              className = { 'transaction-search-bar' }
              ref = { 'search' }
              placeholder = { 'Search Transactions' }
              value = { this.state.searchString }
              onChange = { this.updateSearch } />
          </div>
        </div>
        {
          transactions ?
          <div className = { 'transaction-details-container-grid' }>
            {
               this.state.transactions.slice(0, index).map((transaction, key) => (
                <TransactionCardComponent
                  detail = { transaction }
                  key = { key >= index }
                  transactions = {transactions}
                  onClick = { transaction =>
                    this.props.history.push(`/mybenefits/transactions/personal/${transaction.id}`) }
                />
              ))
            }
          </div>        :
          <div className = { 'transactions-loader' }>
            <center>
              <CircularLoader show = { true } />
            </center>
          </div>
        }
      </div>
    )
  }
}
export default ConnectPartial (TransactionPersonalFragment, Presenter)
