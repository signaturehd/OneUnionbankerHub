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

class TransactionFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      view : false,
      details : null,
      transactions:[]
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(2)
    this.presenter.getTransactions()
  }
  showTransactions(transactions){
    this.setState({transactions})
  }


  render () {
    const {transactions, detail,details}=this.state
    const { onClick, text, path, icon } = this.props

    return (
      <div>
        <div>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1> Transactions </h1>
        <div className = { '_transaction-container' }>
        {
          transactions.map((transaction, key) =>
            <TransactionCardComponent
              detail = { transaction } key = { key }
              onClick = { (details, view) => this.setState({ details, view }) }
            />
          )
        }
        {
          this.state.view &&
          <TransactionModal details = { details } onClose = { () => this.setState({ view : false }) }/>
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
