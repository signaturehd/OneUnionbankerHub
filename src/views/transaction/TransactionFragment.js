import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import './styles/transaction.css'

class TransactionFragment extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(2)
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

TransactionFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default TransactionFragment
