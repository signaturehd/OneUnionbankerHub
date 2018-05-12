import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import SettingsCardComponent from './components/SettingsCardComponent'

class SettingsFragment extends BaseMVPView {
  constructor ( props ) {
    super(props)

    this.state = {
      profile : [],
    }
  }
  componentDidMount () {
    this.presenter.getProfile()
    this.props.setSelectedNavigation(4)
  }
  profile ( profile ) {
    this.setState({ profile })
  }
  render () {
    const { profile } = this.state

    return (
      <div>
        <h1>Settings</h1>
        <h2>  </h2>
        <div className = 'card-container'>
        {
          profile.map((prof, i) =>
            <SettingsCardComponent
              key={ i }
              prof = { prof }/>)
        }
        </div>
      </div>
    )
  }
}

SettingsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  showProfile : PropTypes.array
}

export default ConnectView(SettingsFragment, Presenter)
