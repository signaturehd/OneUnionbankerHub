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
     enabledLoader: false,
     showChangePINModal : false,
     showContactInfoModal : false,
     showDependentModal : false,
     showCompanyInfoModal : false,
     showPersonalInfoModal : false,
     showStaffAccountsModal : false,
    }
  }
  componentDidMount () {
    this.presenter.getProfile()
    this.props.setSelectedNavigation(3)
  }
  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  hideCircularLoader () {
    this.setState({ enabledLoader : false })
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

  hideModal (showChangePINModal) {
    this.setState({ showChangePINModal })
  }

  submitUpdatedPIN (uniqueOldPIN, uniqueNewPIN) {
    const objectPINParam = {
      oldCode : uniqueOldPIN,
      newCode : uniqueNewPIN,
    }
    this.presenter.putEnrollPin(objectPINParam)
  }

  render () {
    const {
      lineManager,
      profile,
      details,
      className,
      rank,
      profileDependent,
      accountNumber,
      enabledLoader,
      showChangePINModal,
      showContactInfoModal,
      showDependentModal,
      showCompanyInfoModal,
      showPersonalInfoModal,
      showStaffAccountsModal,
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
           enabledLoader = { enabledLoader }
           showChangePINModal = { showChangePINModal }
           showContactInfoModal = { showContactInfoModal }
           showDependentModal = { showDependentModal }
           showCompanyInfoModal = { showCompanyInfoModal }
           showPersonalInfoModal = { showPersonalInfoModal }
           showStaffAccountsModal = { showStaffAccountsModal }
           changePinSendToFragment = { (uniqueOldPIN, uniqueNewPIN) => this.submitUpdatedPIN(uniqueOldPIN, uniqueNewPIN) }
        />
      </div>
    )
  }
}

SettingsFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
