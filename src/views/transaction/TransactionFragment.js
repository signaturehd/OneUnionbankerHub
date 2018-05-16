import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'
import {Card} from '../../ub-components/'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import TransactionCardComponent from './components/TransactionCardComponent/TransactionCardComponent'
import TransactionModal from './modals/TransactionModal'
import GetTransactionParam from '../../domain/param/GetTransactionParam'

class TransactionFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      view : false,
      details : null,
      transactions:[],
      transactionID: null
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(2)
    this.presenter.getTransactions()
    this.presenter.getTransactionId(this.props.details)

  }
  showTransactions(transactions){
    this.setState({transactions})
  }

getTransactionId(transactionID){
  this.setState({transactionID})
}
 getTransactionId(id){
  this.props.presenter.getTransactionId(id)
    }

    showTransactionId(transactionsID){
      this.setState({transactionsID})
    }
  render () {
    const {transactions, detail,details,transactionsID,transID}=this.state
    const { onClick, text, path, icon } = this.props
console.log(transactionsID)

    return (
      <div>
        { super.render() }
        <div>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1> Transactions </h1>
        <div className = { '_transaction-container' }>
        {
          
          transactions && transactions && transactions.map((transaction, key) =>
            <TransactionCardComponent
              detail = { transaction } key = { key }
              onClick = { (details, view) => this.setState({ details, view }) }
              
            />
          )
        }
        
        {
          this.state.view &&
           transactionsID && transactionsID && transactionsID.map((transactionsid, key) =>
          <TransactionModal
           details = { details } 
           detail = {transactionsid} onClose = { () => this.setState({ view : false }) }/>
        }

        </div>
      </div>
    )
  }
}

TransactionFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial (TransactionFragment, Presenter)
