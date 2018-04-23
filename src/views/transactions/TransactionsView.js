import React from 'react'
import TransactionsInteractor from '../../domain/interactor/transactions/TransactionsInteractor'
import Presenter from './presenter/TransactionsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericCard } from '../../ub-components/Cards'

class TransactionsView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      transactions: []
    }
  }

  componentDidMount () {
    this.presenter.getTransactions()
  }

  showTransactions (transactions) {
    this.setState({ transactions })
  }

  render () {
  const { transactions } = this.state
  console.log('rendering')

  return (

    <div>
      <h4>Transactions</h4>
    </div>
    )
  }
}

export default ConnectPartial(TransactionsView, Presenter)
