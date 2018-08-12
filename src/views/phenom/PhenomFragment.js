import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PhenomPresenter'

class PhenomFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      phenomDataList : [],
    }
  }

  componentDidMount () {

  }

  showPhenomData (phenomDataList) {
    this.setState({ phenomDataList })
  }

  render () {
    const { phenomDataList } = this.state

    return (
      <div>
        
      </div>
    )
  }
}

export default ConnectView (PhenomFragment, Presenter)
