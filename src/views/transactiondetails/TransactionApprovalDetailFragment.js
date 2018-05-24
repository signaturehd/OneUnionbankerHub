import React from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TransactionDetailsPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components'

import './styles/transaction-details.css'

class TransactionApprovalDetailsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      details : null
    }
  }

  navigate () {
    this.props.history.push('/mybenefits/transactions/approval')
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    const id = this.props.match.params.id
    this.presenter.getTransactionDetails(id)
  }

  getTransactionDetails (details) {
    this.setState({ details })
  }

  render () {
    const { details } = this.state
    return (
      <div  className = {'container'}>
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = {
              this.navigate.bind(this) }></i>
          <h1>Transaction for Approval</h1>
        </div>
        {
          details ?
            <div className = {'transaction-details-container'}></div>
            :
            <div className = {'transaction-details-loader'}>
              <center>
                <CircularLoader show = {true}/>
              </center>
            </div>
        }
      </div>
    )
  }
}

export default ConnectPartial(TransactionApprovalDetailsFragment, Presenter)
