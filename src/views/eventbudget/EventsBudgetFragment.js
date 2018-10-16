import React from 'react'

import Presenter from './presenter/EventsBudgetPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
  }

  render () {

    return (
      <div>
        { super.render() }
        test
      </div>
    )
  }
}

export default ConnectView(EventsBudgetFragment, Presenter)
