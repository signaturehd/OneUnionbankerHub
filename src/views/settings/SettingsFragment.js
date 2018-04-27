import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

class SettingsFragment extends BaseMVPView {

  componentDidMount () {
    this.props.setSelectedNavigation(4)
  }

  render () {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    )
  }
}

SettingsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
