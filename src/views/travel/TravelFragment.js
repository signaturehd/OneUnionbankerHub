import React from 'react'

import Presenter from './presenter/TravelPResenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from  '../common/base/BaseMVPView'


class TravelFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        { super.render() }
      </div>
    )
  }
}


export default ConnectView(TravelFragment, Presenter)
