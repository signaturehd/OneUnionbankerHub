import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line, FloatingActionButton } from '../../../ub-components/'
import SettingsProfileDescriptions from './SettingsProfileDescriptions'

import ContactInfoModal from '../modals/ContactsModal'
import DependentsModal from '../modals/DependentsModal'
import CompanyInfoModal from '../modals/CompanyInformationModal'
import PersonalInfoModal from '../modals/PersonalInfoModal'
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

  renderEditable () {
  }

  renderSaveIntances () {
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
      showContactInfoModalFunc,
      showDependentModalFunc,
      showCompanyInfoModalFunc,
      showPersonalInfoModalFunc,
      showStaffAccountsModalFunc,
      showChangePINModal,
      showContactInfoModal,
      showDependentModal,
      showCompanyInfoModal,
      showPersonalInfoModal,
      showStaffAccountsModal,
      getStaffAccounts,
      staffLoader,
      staffAccounts,
      onClickEmployeeConfirmationFunc,
      onChangeToEditMode,
      descriptionTextFunc,
      onUpdateDescription,
      showDevicesModal,
      showDevicesModalFunc
    } = this.props


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
          showContactInfoModal &&
            <ContactInfoModal
              profileName={ profile && profile.fullname }
              profileEmail={ profile && profile.email }
              profileNumber={ profile && profile.contactNumber }
              onClose={ () => showContactInfoModalFunc(false) }
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
          showPersonalInfoModal &&
            <PersonalInfoModal
              accountNumber={ accountNumber }
              profile={ profile && profile}
              onClose={ () => showPersonalInfoModalFunc(false) }
            />
        }
        {
          showCompanyInfoModal &&
            <CompanyInfoModal
              profile={ profile && profile}
              lineManager={ lineManager && lineManager.fullName }
              rank={ rank && rank.rank }
              onClose={ () => showCompanyInfoModalFunc(false) }
            />
        }
        {
          showStaffAccountsModal &&
          <StaffAccountsModal
            staffLoader = { staffLoader }
            staffAccounts = { staffAccounts }
            employeeNumber = { profile.employeeNumber }
            getStaffAccounts = { getStaffAccounts }
            onClickEmployeeConfirmation = { (resp, resp1) => onClickEmployeeConfirmationFunc(resp, resp1) }
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
        <div>
          <Card className={ 'profile-settings-card-view' }>
            <div className={ 'profile-banner' }>
              <div className={ 'profile-picture-card' }>
                <div>
                  <div className = { 'profile-picture' }>
                    <h2 className = { 'profile-initial-text' }>{ splitUserInitial }</h2>
                  </div>
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
                <br/>
                <div
                  onClick = { () => showDevicesModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings pinlock-icon' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'Registered Devices'  }
                    </h5>
                  </div>
                </div>
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
                  onClick={ () => showPersonalInfoModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeContactAddress' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See personal info'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => showContactInfoModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeContact' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See contact info'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => showDependentModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeDependent' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See dependents list'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => showCompanyInfoModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeId' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See company info'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => showStaffAccountsModalFunc(true) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings staffAccount' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'View Staff Accounts'  }
                    </h5>
                  </div>
                </div>
              </div>
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
