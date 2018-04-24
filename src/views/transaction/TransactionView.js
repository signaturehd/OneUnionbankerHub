import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'

class TransactionView extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { onClick, text, path, icon } = this.props

    return (
      <div>
        <div>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1> Transaction </h1>
        <div className = { '_transaction-container' }>
        </div>
      </div>
    )
  }
}

export default TransactionView
