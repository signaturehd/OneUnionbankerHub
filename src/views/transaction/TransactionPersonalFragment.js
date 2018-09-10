import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'

import './styles/transaction.css'
import {
  Card,
  CircularLoader,
  GenericButton,
  GenericInput
} from '../../ub-components/'

import * as TransactionPersonalFunction from './controller/TransactionPersonalFunction'

import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'

import TransactionCardComponent
from './components/TransactionCardComponent/TransactionCardComponent'

class TransactionPersonalFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      transactionId : null,
      transactions: null,
      transaction: null,
      searchString : '',
      index: 3,
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
    this.presenter.getTransactionsPersonal()
  }

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  transactions (transactions) {
    this.setState({ transactions })
  }

  render () {
    const {
      transactions,
      transaction,
      searchString,
      index
    } = this.state

    let transactionSearch = transactions
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
          transactionSearch = transactions.filter(transactions =>
         transactions.benefit.toLowerCase().match(search) ||
         transactions.referenceNumber.toLowerCase().match(search))
    }

    const {
      onClick,
    } = this.props

    return (
    <div>
        {
          transactions ?
        <div className = { 'transaction-details-personal-grid-row' }>

          <div className = { 'grid-global' }>
            <div></div>
            <div>
              <GenericInput
                type = { 'text' }
                className = { 'transaction-search-bar' }
                refCallback = { 'search' }
                hint = { 'Search Transactions' }
                value = { searchString }
                onChange = { this.updateSearch } />
            </div>
          </div>
          <div className = { 'transaction-details-container-grid' }>
            {
               transactionSearch.slice(0, index).map((transaction, key) => (
               <TransactionCardComponent
                  detail = { transaction }
                  key = { key  }
                  transactions = { transactions }
                  onClick = { transaction =>
                    this.props.history.push(`/mybenefits/transactions/personal/${transaction.id}`) }
                  />
              ))
            }
          </div>

          <div className = { 'grid-global' }>
            {
              index > 3 &&
              <GenericButton
                className = { 'transaction-component-button' }
                text = { 'View Less' }
                onClick = { () =>
                  this.setState({
                    index : TransactionPersonalFunction.indexDecreased(index)
                    })
                  }
                />
            }
            <GenericButton
              className = { 'transaction-component-button' }
              text = { 'View More' }
              onClick = { () =>
                this.setState({
                  index : TransactionPersonalFunction.indexIncreased(index)
                  })
                }
              />
          </div>
        </div>
            :
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
