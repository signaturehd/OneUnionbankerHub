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
      viewMoreText : 'View more',
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
      index,
      viewMoreText,
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

    const isVisible = (transactionSearch && transactionSearch.length > 3) ? '' : 'hide'

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
              key = { key }
              transactions = { transactions }
              onClick = { transaction =>
                this.props.history.push(`/mybenefits/transactions/personal/${transaction.id}`) }
              />
            ))
          }
        </div>
        <br/>
        <div>
          <button
            type = { 'button' }
            className = { `viewmore tooltip ${isVisible}` }
            onClick = {
              () => {
                if(index === transactionSearch.length)
                 this.setState({ index : 3, viewMoreText : 'View more' })
                else
                 this.setState({ index : transactionSearch.length, viewMoreText : 'View less' })
              }
            }>
            <img src={ require('../../images/icons/horizontal.png') } />
            <span className={ 'tooltiptext' }>{ viewMoreText }</span>
          </button>
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
