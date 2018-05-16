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
      transactionResponse : null
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(2)
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
      transactionId,
      transactionResponse
    } = this.state

    const {
      onClick,
      text,
      path,
      icon
    } = this.props

    return (
      <div>
        { super.render() }
        <h1> Transactions </h1>
        <div className = { '_transaction-container' }>
        {
          
          transactions &&
          transactions.map((transaction, key) =>
            <TransactionCardComponent
              detail = { transaction } key = { key }
              onClick = { (transactionId, view) => this.setState({ transactionId, view }) }
            />
          )
        }

        {
          view &&
          <TransactionModal
            transactionResponse = { transactionResponse }
            presenter = { () => this.presenter.getTransactionById(transactionId) }
            onClose = { () => this.setState({view : false})}
          />
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
