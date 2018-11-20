import React from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/HomePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import {
  CircularLoader,
  GenericInput,
  Line,
  Card,
  SkeletalLoader,
} from '../../ub-components'

import './styles/homeStyle.css'

class HomeFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.presenter.getCheckGreetingsStatus()
    this.props.setSelectedNavigation(0)
  }

  render () {
    return (
      <div className = 'container'>

      </div>
    )
  }
}

HomeFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(HomeFragment, Presenter)
