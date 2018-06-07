import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import GetProfileInteractor from '../../domain/interactor/user/GetProfileInteractor'

import SettingsCardComponent from './components/SettingsCardComponent'

import { Card } from '../../ub-components/'
import './styles/profile.css'

class SettingsFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
     profile: [],
     profileInfo: [],
     rank: [],
     linemanager: [],
     profileDependent: [],
     showProfile : false,
     showRank : false,
     showEmployeeProfile : false,
     showLineManager : false,
     showProfileDependent : false,
    }
  }
  componentDidMount () {
    this.presenter.getProfile()
    this.props.setSelectedNavigation(3)
  }
  showProfile (profile) {
    this.setState({ profile })
  }
  showEmployeeProfile (profileInfo) {
    this.setState({ profileInfo })
  }
  showRank (rank) {
    this.setState({ rank })
  }
  showProfileDependent (profileDependent) {
    this.setState({ profileDependent })
  }
  showLineManager (linemanager) {
    this.setState({ linemanager })
  }
  render () {
    const { linemanager, profile, details, className, rank, profileDependent } = this.state

    return (
      <div className = { 'profile-container' }>
        { super.render() }
      <h1 className = { 'title-view' }> Profile </h1>
        <SettingsCardComponent
         profile = { profile }
         linemanager = { linemanager }
         profileDependent = { profileDependent }
         rank = { rank }
         presenter = { this.presenter }/>
      </div>
    )
  }
}

SettingsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
