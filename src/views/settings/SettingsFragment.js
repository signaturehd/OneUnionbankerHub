import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import SettingsProfileCardComponent from './components/SettingsProfileCardComponent'
import RequestOtpModal from './modals/RequestOtpModal'
import * as controller from './functions/SettingFunctions'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput
} from '../../ub-components/'

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
     showDependentModal : false,
     showStaffAccountsModal : false,
     showDevicesModal : false,
     staffLoader : false,
     noticeResponseModal : false,
     descriptionEditMode : false,
     enabledStaffLoader : false,
     showSuccessModal : false,
     showProfilePhoto : false,
     showPinComponent : false,
     showChangePinComponent : false,
     showUnlockPinComponent : false,
     showNewPin : true,
     showPinSettingsComponent : true,
     showResetModal : false,
     uniqueOldPIN: '',
     uniqueNewPIN: '',
     noticeResponse : '',
     descriptionText : '',
     staffResponseMessage : '',
     requiredOtp : '',
     newCode : '',
     requiredNewPin  : '',
     profileBackground : [],
     showEditDependents: '',
     profileAttachments : [{
      name : 'Profile Photo Attachments'
    }]
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
    this.setState({ noticeResponse, noticeResponseModal : true, enabledLoader: false })
  }

  noticeResponseModalStaff (staffResponseMessage) {
    this.setState({ staffResponseMessage })
    this.setState({ showSuccessModal : true })
  }

  showResetModalFunc(showResetModal) {
    this.setState({ showResetModal })
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

  submitUpdatedPIN (uniqueOldPIN, uniqueNewPIN) {
    const objectPINParam = {
      oldCode : uniqueOldPIN,
      newCode : uniqueNewPIN,
    }
    this.presenter.putEnrollPin(objectPINParam)
  }

  showDevicesData (devices, showDevicesModal) {
    this.setState({ devices, showDevicesModal })
  }

  updateDescription () {
    const {
      descriptionText
    } = this.state
    this.presenter.updateDescription(descriptionText)
    this.setState({ descriptionEditMode : false })
  }

  requiredNewPinValidate (data) {
    this.setState({ requiredNewPin :  controller.checkedValidateInputNumber(data) })
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
      showDependentModal,
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
      staffResponseMessage,
      showSuccessModal,
      showEditDependents,
      showProfilePhoto,
      showPinComponent,
      profileAttachments,
      uniqueOldPIN,
      uniqueNewPIN,
      showChangePinComponent,
      showUnlockPinComponent,
      showPinSettingsComponent,
      showResetModal,
      requiredOtp,
      newCode,
      showNewPin,
      requiredNewPin
    } = this.state

    const {
      profileImage
    } = this.props

    return (
      <div className={ 'profile-container' }>
        { super.render() }
        {
          showResetModal &&
          <RequestOtpModal
            onClose = { () => this.setState({ showResetModal : false }) }
            enabledLoader = { enabledLoader }
            showNewPin = { showNewPin }
            requiredOtp = { requiredOtp }
            requiredNewPin = { requiredNewPin }
            requiredOtpFunc = { (requiredOtp) => this.setState({ requiredOtp }) }
            requiredNewPinFunc = { (e) =>
              this.requiredNewPinValidate(e)
            }
            submitFunction = { () => this.presenter.requestUnlockPin(requiredOtp, requiredNewPin) }
            showNewPinFunc = { (showNewPin) => this.setState({ showNewPin }) }
          />
        }
        {
          enabledLoader ?
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { enabledLoader }/>
            </center>
          </Modal>
          :
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
           showPinSettingsComponent = { showPinSettingsComponent }
           showPinComponent = { showPinComponent }
           profileAttachments = { profileAttachments }
           uploadAttachments = { () => {
               this.setState({ showProfilePhoto : false, enabledLoader: true })
               this.presenter.updateProfilePicture(profileAttachments)
           } }
           uniqueOldPIN = { uniqueOldPIN }
           uniqueNewPIN = { uniqueNewPIN }
           uniqueOldPINFunc = { (uniqueOldPIN) => this.setState({ uniqueOldPIN }) }
           uniqueNewPINFunc = { (uniqueNewPIN) => this.setState({ uniqueNewPIN }) }
           profileImage = { profileImage }
           showChangePinComponent = { showChangePinComponent }
           showUnlockPinComponent = { showUnlockPinComponent }
           showPinComponentFunc = { (showPinComponent) => this.setState({ showPinComponent }) }
           showPinSettingsComponentFunc = { (showPinSettingsComponent) =>
             this.setState({ showPinSettingsComponent })
           }
           showChangePinComponentFunc = { (showChangePinComponent) =>
             this.setState({ showChangePinComponent })
           }
           showUnlockPinComponentFunc = { () =>
             this.presenter.getRequestPinOtp()
           }
           setAttachmentsPhoto = { (profileAttachments) => this.setState({ profileAttachments }) }
           changeProfilePhoto = { (showProfilePhoto) => this.setState({ showProfilePhoto }) }
           showProfilePhoto = { showProfilePhoto }
           showEditDependentModalFunc = { (showEditDependents) => this.props.history.push('/dependent') }
           showSuccessModal = { showSuccessModal }
           onCloseStaffResponseModalFunc = { () => this.setState({ showSuccessModal : false  }) }
           staffResponseMessage = { staffResponseMessage }
           devices = { devices }
           showDevicesModal = { showDevicesModal }
           profileBackground = { profileBackground }
           descriptionEditMode = { descriptionEditMode }
           descriptionText = { descriptionText }
           accountNumber = { accountNumber }
           profile={ profile && profile }
           lineManager={ lineManager }
           profileDependent={ profileDependent }
           enabledStaffLoader = { enabledStaffLoader }
           rank={ rank }
           enabledLoader = { enabledLoader }
           staffLoader = { staffLoader }
           staffAccounts = { staffAccounts }
           showChangePINModal = { showChangePINModal }
           showDependentModal = { showDependentModal }
           showStaffAccountsModal = { showStaffAccountsModal }
           showChangePINModalFunc = { (showChangePINModal) => this.setState({ showChangePINModal }) }
           showDependentModalFunc = { (showDependentModal) => this.setState({ showDependentModal }) }
           showStaffAccountsModalFunc = { (showStaffAccountsModal) =>  this.setState({ showStaffAccountsModal }) }
           changePinSendToFragment = { (uniqueOldPIN, uniqueNewPIN) => this.submitUpdatedPIN(uniqueOldPIN, uniqueNewPIN) }
           getForConfirmation = { () => this.presenter.getForConfirmation() }
           onUpdateStaffAccountsFunc = { (employeeName, selectedAccountNumber, sequence) =>
               this.presenter.updateStaffAccounts(employeeName, selectedAccountNumber, sequence)
           }
           onUpdateEmailAddress = { (email) =>
             this.presenter.updateEmailAddress(email)
           }
           onUpdateCivilStatus = { (civil) =>
             this.presenter.updateCivilStatus(civil)
           }
           onUpdateMobileNumber = { (number) =>
             this.presenter.updateContactNumber(number)
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
             this.presenter.getDevices(showDevicesModal)
           }
          }
          updateAddressOption = { (address, attachments) => this.presenter.updateAddress(address, attachments) }
        />
      </div>
    )
  }
}

SettingsFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
