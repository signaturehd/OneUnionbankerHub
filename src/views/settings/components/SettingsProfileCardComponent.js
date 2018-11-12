import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line, FloatingActionButton, MultipleAttachments, Modal, GenericButton } from '../../../ub-components/'
import SettingsProfileDescriptions from './SettingsProfileDescriptions'
import SettingsProfilePersonalInfoComponent from './SettingsProfilePersonalInfoComponent'
import SettingsContactInfoComponent from './SettingsContactInfoComponent'

import DependentsModal from '../modals/DependentsModal'
import StaffAccountsModal from '../modals/StaffAccountsModal'
import ChangePINModal from '../modals/ChangePINModal'
import DevicesModal from '../modals/SettingDevicesModal'

import SkillsFragment from '../../common/fragments/ProfileFragments/SkillsFragment'
import ExperienceFragment from '../../common/fragments/ProfileFragments/ExperienceFragment'
import CertificateFragment from '../../common/fragments/ProfileFragments/CertificateFragment'
import EducationFragment from '../../common/fragments/ProfileFragments/EducationFragment'

import './styles/profileSettings.css'

class SettingsProfileCardComponent extends Component {

  constructor (props) {
    super(props)
  }


  render () {
    const {
      profile,
      descriptionEditMode,
      descriptionText,
      profileBackground,
      onClick,
      rank,
      devices,
      lineManager,
      profileImageUrl,
      profileDependent,
      accountNumber,
      changePinSendToFragment,
      enabledLoader,
      showChangePINModalFunc,
      showDependentModalFunc,
      showStaffAccountsModalFunc,
      showChangePINModal,
      showDependentModal,
      showStaffAccountsModal,
      staffLoader,
      staffAccounts,
      onClickEmployeeConfirmationFunc,
      onChangeToEditMode,
      descriptionTextFunc,
      onUpdateDescription,
      showDevicesModal,
      showDevicesModalFunc,
      onUpdateStaffAccountsFunc,
      getForConfirmation,
      enabledStaffLoader,
      staffResponseMessage,
      showSuccessModal,
      showEditDependentModalFunc,
      showProfilePhoto,
      profileAttachments,
      changeProfilePhoto,
      profileImage
    } = this.props

    const style = {
      backgroundImage : `url(${profileImage && profileImage})`,
      backgroundRepeat : 'no-repeat',
      backgroundSize: 'cover',
      height: 'unset',
      backgroundPosition: 'center',
      boxShadow: 'inset 0px 0px 0px 0px #ffffff',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    }

    let genderPartial
    if (profile.gender === 'M') {
      genderPartial='Male'
    } else {
      genderPartial='Female'
    }

    const profileInitial = profile && profile.fullname ? profile.fullname : 'Empty Empty'
    let splitUserInitial = profileInitial.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')

    return (
    <div>
      <div className={ 'profile-settings-grid-column-desktop' }>
        {
          showChangePINModal &&
          <ChangePINModal
            enabledLoader = { enabledLoader }
            onSubmitPinCode = { (uniqueOldPIN, uniqueNewPIN) => changePinSendToFragment(uniqueOldPIN, uniqueNewPIN) }
            onClose={ () => showChangePINModalFunc(false) }
          />
        }
        {
          showDependentModal &&
            <DependentsModal
              profileName={ profile && profile.fullname }
              dependents={ profileDependent && profileDependent }
              onClose={ () => showDependentModalFunc(false) }
            />
        }
        {
          showStaffAccountsModal &&
          <StaffAccountsModal
            onCloseStaffResponse = { () => this.props.onCloseStaffResponseModalFunc() }
            staffResponseMessage = { staffResponseMessage }
            enabledStaffLoader = { enabledStaffLoader }
            staffLoader = { staffLoader }
            staffAccounts = { staffAccounts }
            employeeNumber = { profile.employeeNumber }
            name = { profile.fullname }
            showSuccessModal = { showSuccessModal }
            getForConfirmation = { () => getForConfirmation() }
            onUpdateStaffAccounts = { (employeeName, selectedAccountNumber, sequence) =>
              onUpdateStaffAccountsFunc(employeeName, selectedAccountNumber, sequence) }
            onClickEmployeeConfirmation = { (
              fullName,
              accountNumber,
              accountTypeCode,
              accountCapacityCode,
              accountRemarks
            ) => onClickEmployeeConfirmationFunc(
              fullName,
              accountNumber,
              accountTypeCode,
              accountCapacityCode,
              accountRemarks
            ) }
            onClose={ () => showStaffAccountsModalFunc(false) }
          />
        }
        {
          showDevicesModal &&
          <DevicesModal
            devices = { devices }
            onClose = { () => showDevicesModalFunc(false) }
            />
        }
        {
          showProfilePhoto &&
          <Modal
            onClose = { () =>  changeProfilePhoto (false) }
            isDismisable = { true }>
            <MultipleAttachments
              count = { 1 }
              countFunc = { () => {} }
              placeholder = { 'Profile Photo Attachments' }
              fileArray = { profileAttachments }
              setFile = { (profileAttachments) =>
                  this.props.setAttachmentsPhoto(profileAttachments)
              }
              />
              <br/>
            <center>
              <GenericButton
                className = { 'profile-button-small' }
                text = { 'Save' }
                onClick = { () => this.props.uploadAttachments() }
              />
            </center>
          </Modal>
        }
        <div>
          <Card className={ 'profile-settings-card-view' }>
            <div className={ 'profile-banner' }>
              <div className={ 'profile-picture-card' }>
                <div className = 'profilePicture' >
                  {
                    profileImage && profileImage ?
                    <div style ={{
                      height : '100%',
                      width :  '100%'
                    }}>
                      <div
                        onClick = { () => changeProfilePhoto(true) }
                        style = { style }>
                      </div>
                      <small className = { 'profilePictureLabel' }>Edit Picture</small>
                    </div>
                     :
                    <div className = { 'profile-picture profilePicture' } onClick = { () => changeProfilePhoto(true) }>
                      <h2 className = { 'profile-initial-text' }>{ splitUserInitial }</h2>
                      <small className = { 'profilePictureLabel' }>Edit Picture</small>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className={ 'profile-information-view' }>
              <div className={ 'profile-padding' }>
                <h1 className={ 'profile-name' }>
                  { profile.fullname ? profile.fullname : '(Not Yet Provided)' }
                </h1>
                <h2 className={ 'profile-position' }>
                  { profile.position ? profile.position  : '(Not Yet Provided) '} at UnionBank of the Philippines
                </h2>
                <h2 className={ 'profile-margin-label' }>
                  { profile.address ? profile.address  : '(Not Yet Provided)' }
                </h2>
                <br/>
              </div>
              <div className = { 'profile-information-modal-view' }>
                <div
                  onClick={ () => showChangePINModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings pinlock-icon' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'Change PIN'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick = { () => showDevicesModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings devices' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'Registered Devices'  }
                    </h5>
                  </div>
                </div>
                <div
                  className={ 'profile-information-view-right' }>
                  <div >
                    <span className={ 'profile-icon-settings employeeDependent' }/>
                  </div>
                  <div className = { 'edit-dependents-grid' }>
                    <h5
                      onClick={ () => showDependentModalFunc(true) }
                      className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See dependents'  }
                    </h5>
                    <span
                      onClick = { () => showEditDependentModalFunc(true) }
                      className = { 'profile-icon-settings editIconImage' }/>
                  </div>
                </div>
                <div
                  className={ 'profile-information-view-right' }>
                  <div >
                    <span className={ 'profile-icon-settings line-manager' }/>
                  </div>
                  <div>
                    <h5
                      onClick={ () => showStaffAccountsModalFunc(true) }
                      className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See Staff Accounts'  }
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={ 'profile-padding' }>
              <br/><Line/><br/>
            </div>
              <SettingsProfilePersonalInfoComponent
                accountNumber={ accountNumber }
                profile={ profile && profile}
                updateAddressFunc = { (e, e1) => this.props.updateAddressOption(e, e1) }
                onUpdateCivilStatusFunc = { (e) => this.props.onUpdateCivilStatus(e) }
                lineManager={ lineManager && lineManager.fullName }
                rank={ rank && rank.rank }
              />
            <div className={ 'profile-padding' }>
              <br/><Line/><br/>
            </div>
            <div>
              <SettingsContactInfoComponent
                profileName={ profile && profile.fullname }
                profileEmail={ profile && profile.email }
                profileNumber={ profile && profile.contactNumber }
                onUpdateEmailAddressFunc = { (e) => this.props.onUpdateEmailAddress(e) }
                onUpdateMobileNumberFunc = { (e) => this.props.onUpdateMobileNumber(e) }
              />
            </div>
            <div className={ 'profile-padding' }>
              <br/><Line/><br/>
            </div>
            <div>
              <SettingsProfileDescriptions
                onUpdateDescription = { () => onUpdateDescription() }
                descriptionTextFunc = { (e) => descriptionTextFunc(e) }
                onChangeToEditMode = { (e) => onChangeToEditMode(e) }
                descriptionText = { descriptionText }
                descriptionEditMode = { descriptionEditMode }
                profileDescriptions={ profile && profile.description }
                profileRatings={ profile && profile.performanceRating }
              />
            </div>
          </Card>
          <ExperienceFragment
            profileExperience={ profileBackground && profileBackground.employments }
            />
          <EducationFragment
            profileEducation={ profileBackground && profileBackground.education }
            />
        </div>
        <div>
          <CertificateFragment
            profileCertificate={ profileBackground && profileBackground.certificates } />

          <SkillsFragment
            profileSkills={ profileBackground && profileBackground.skills }/>
        </div>

      </div>
      <div className={ 'profile-settings-grid-column-mobile' }>
      </div>
    </div>
    )
  }
}

SettingsProfileCardComponent.propTypes = {
  onClick : PropTypes.func,
  onClose : PropTypes.func,
  changePinSendToFragment : PropTypes.func,
  onClickEmployeeConfirmationFunc : PropTypes.func,
  profileImageUrl : PropTypes.string,
  rank: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  profile:  PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  lineManager: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  enabledLoader: PropTypes.bool,
  devices: PropTypes.array,
}

export default SettingsProfileCardComponent
