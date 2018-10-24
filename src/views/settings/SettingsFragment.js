import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import SettingsProfileCardComponent from './components/SettingsProfileCardComponent'

import { Card, Modal, GenericButton   } from '../../ub-components/'

class SettingsFragment extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state={
     profile: [],
     profileInfo: [],
     rank: [],
     devices: [],
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
     showDevicesModal : false,
     staffLoader : false,
     noticeResponseModal : false,
     descriptionEditMode : false,
     enabledStaffLoader : false,
     noticeResponse : '',
     descriptionText : '',
     profileBackground : []
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

  noticeResponseModal (noticeResponse) {
    this.setState({ noticeResponse, noticeResponseModal : true })
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

  showProfileBackground (profileBackground) {
    this.setState({ profileBackground })
  }

  hideModal (showChangePINModal) {
    this.setState({ showChangePINModal })
  }

  hideStaffLoader () {
    this.setState({ enabledStaffLoader : false, showStaffAccountsModal : false })
  }

  showStaffLoader () {
    this.setState({ enabledStaffLoader : true })
  }

  submitUpdatedPIN (uniqueOldPIN, uniqueNewPIN) {
    const objectPINParam = {
      oldCode : uniqueOldPIN,
      newCode : uniqueNewPIN,
    }
    this.presenter.putEnrollPin(objectPINParam)
  }

  showDevicesData (devices) {
    this.setState({ devices })
  }

  updateDescription () {
    const {
      descriptionText
    } = this.state
    this.presenter.updateDescription(descriptionText)
    this.setState({ descriptionEditMode : false })
  }

  render () {
    const {
      lineManager,
      profile,
      details,
      devices,
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
      showDevicesModal,
      staffLoader,
      staffAccounts,
      noticeResponse,
      descriptionText,
      noticeResponseModal,
      profileBackground,
      descriptionEditMode,
      enabledStaffLoader,
    }=this.state

    return (
      <div className={ 'profile-container' }>
        { super.render() }
        {
          noticeResponseModal &&
          <Modal>
            <center>
              <h2>{ noticeResponse }</h2>
              <br/>
              <GenericButton
                text = { 'Ok' }
                onClick = { () => this.setState({ noticeResponseModal: false }) }
                />
            </center>
          </Modal>
        }
        <SettingsProfileCardComponent
           devices = { devices }
           showDevicesModal = { showDevicesModal }
           profileBackground = { profileBackground }
           descriptionEditMode = { descriptionEditMode }
           descriptionText = { descriptionText }
           accountNumber = { accountNumber }
           profile={ profile }
           lineManager={ lineManager }
           profileDependent={ profileDependent }
           enabledStaffLoader = { enabledStaffLoader }
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
           getForConfirmation = { () => this.presenter.getForConfirmation() }
           onUpdateStaffAccountsFunc = { (employeeName, selectedAccountNumber, sequence) =>
              this.presenter.updateStaffAccounts(employeeName, selectedAccountNumber, sequence)
            }
           onClickEmployeeConfirmationFunc = {
          (  fullName,
             accountNumber,
             accountTypeCode,
             accountCapacityCode,
             accountRemarks
           ) =>
           this.presenter.addStaffAccounts(
             fullName,
             accountNumber,
             accountTypeCode,
             accountCapacityCode,
             accountRemarks
           )
          }
           onChangeToEditMode = { (descriptionEditMode) => this.setState({ descriptionEditMode }) }
           descriptionTextFunc = { (descriptionText) => this.setState({ descriptionText }) }
           onUpdateDescription = { () => this.updateDescription() }
           showDevicesModalFunc = { (showDevicesModal) => {
             this.presenter.getDevices()
             this.setState({ showDevicesModal })
           }
         }
        />
      </div>
    )
  }
}

SettingsFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
