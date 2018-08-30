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
     staffAccounts : [],
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
     staffLoader : false,
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
  staffCircularLoader (staffLoader) {
    this.setState({ staffLoader })
  }
  showStaffAccount (showStaffAccountsModal) {
    this.setState({ showStaffAccountsModal })
  }
  setStaffAccounts (staffAccounts) {
    this.setState({ staffAccounts })
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
      staffLoader,
      staffAccounts,
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
           staffLoader = { staffLoader }
           staffAccounts = { staffAccounts }
           showChangePINModal = { showChangePINModal }
           showContactInfoModal = { showContactInfoModal }
           showDependentModal = { showDependentModal }
           showCompanyInfoModal = { showCompanyInfoModal }
           showPersonalInfoModal = { showPersonalInfoModal }
           showStaffAccountsModal = { showStaffAccountsModal }
           showChangePINModalFunc = { (showChangePINModal) => this.setState({ showChangePINModal }) }
           showContactInfoModalFunc = { (showContactInfoModal) => this.setState({ showContactInfoModal }) }
           showDependentModalFunc = { (showDependentModal) => this.setState({ showDependentModal }) }
           showCompanyInfoModalFunc = { (showCompanyInfoModal) => this.setState({ showCompanyInfoModal }) }
           showPersonalInfoModalFunc = { (showPersonalInfoModal) => this.setState({ showPersonalInfoModal }) }
           showStaffAccountsModalFunc = { (showStaffAccountsModal) =>  this.setState({ showStaffAccountsModal }) }
           changePinSendToFragment = { (uniqueOldPIN, uniqueNewPIN) => this.submitUpdatedPIN(uniqueOldPIN, uniqueNewPIN) }
           getStaffAccounts = { (id) => this.presenter.getForConfirmation(id) }
           onClickEmployeeConfirmationFunc = { (resp) => this.presenter.addStaffAccounts(resp)  }
        />
      </div>
    )
  }
}

SettingsFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
