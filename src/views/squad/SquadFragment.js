import React from 'react'

import Presenter from './presenter/SquadPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

class SquadFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    this.presenter.getSquads()
  }

  submitSquads (positionId) {
    this.presenter.submitSquads(positionId)
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default ConnectView(SquadFragment, Presenter)
