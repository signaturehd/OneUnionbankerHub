import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'

import Presenter from './presenter/BenefitsPresenter'
import './styles/benefits.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericCard } from '../../ub-components/Cards'

class BenefitsPartial extends BaseMVPView {
  constructor (props) {
    super(props);

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
    const { accountNumber } = this.state;
    return (
      <div className = { '_benefits-container' }>
          <GenericCard className = { '_option-1' } ></GenericCard>
          <GenericCard className = { '_option-1' } ></GenericCard>
          <GenericCard className = { '_option-1' } ></GenericCard>
      </div>
    )
  }
}

export default ConnectPartial(BenefitsPartial, Presenter)
