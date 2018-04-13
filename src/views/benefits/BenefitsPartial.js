import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'

import Presenter from './presenter/BenefitsPresenter'

import ConnectPartial from '../../utils/ConnectPartial'

class BenefitsPartial extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      accountNumber: '',
    }
  }

  showReleasingCenters (releasingCenters) {
    // TODO show to generic multilist dialog
  }

  onValidAccountNumber () {
    // TODO dismiss account number dialog
  }

  render () {
    const { accountNumber } = this.state
    return (
      <div>
        Benefits Partial
        <input onChange={ e => this.setState({ accountNumber: e.target.value }) } />
        {
          // TODO make this button prompt validate account number dialog
        }
        <button onClick={ () =>
          this.presenter.validateAccountNumber(accountNumber) }>
          Validate Account Number
        </button>
        {
          // TODO move to FAB
        }
        <button onClick={ () =>
          this.presenter.getReleasingCenters()
        }>Get Releasing Centers</button>
      </div>
    )
  }
}

export default ConnectPartial(BenefitsPartial, Presenter)
