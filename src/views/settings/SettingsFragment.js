import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import SettingsProfileCardComponent from './components/SettingsProfileCardComponent'

import { Card } from '../../ub-components/'

class SettingsFragment extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state={
     profile: [],
     profileInfo: [],
     rank: [],
     lineManager: [],
     profileDependent: [],
     accountNumber : 'No Account Number',
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
  showLineManager (lineManager) {
    this.setState({ lineManager })
  }

  showAccountNumber (accountNumber) {
    this.setState({accountNumber})
  }
  render () {
    const {
      lineManager,
      profile,
      details,
      className,
      rank,
      profileDependent,
      accountNumber
    }=this.state
    return (
      <div className={ 'profile-container' }>
        { super.render() }
        <SettingsProfileCardComponent
          accountNumber = { accountNumber }
           profile={ profile }
           lineManager={ lineManager }
           profileDependent={ profileDependent }
           rank={ rank }
           presenter={ this.presenter }
        />
      </div>
    )
  }
}

SettingsFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
