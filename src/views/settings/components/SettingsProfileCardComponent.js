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
      onClick,
      rank,
      lineManager,
      profileImageUrl,
      profileDependent,
      accountNumber,
      changePinSendToFragment,
      enabledLoader,
      showChangePINModal,
      showContactInfoModal,
      showDependentModal,
      showCompanyInfoModal,
      showPersonalInfoModal,
      showStaffAccountsModal,
    } = this.props

    let genderPartial
    if (profile.gender === 'M') {
      genderPartial='Male'
    } else {
      genderPartial='Female'
    }

    return (
    <div>
      <div className={ 'profile-settings-grid-column-desktop' }>
        {
          showChangePINModal &&
          <ChangePINModal
            enabledLoader = { enabledLoader }
            onSubmitPinCode = { (uniqueOldPIN, uniqueNewPIN) => changePinSendToFragment(uniqueOldPIN, uniqueNewPIN) }
            onClose={ () => this.setState({ showChangePINModal : false }) }
          />
        }
        {
          showContactInfoModal &&
            <ContactInfoModal
              profileName={ profile && profile.fullname }
              profileEmail={ profile && profile.email }
              profileNumber={ profile && profile.contactNumber }
              onClose={ () => this.setState({ showContactInfoModal : false }) }
            />
        }
        {
          showDependentModal &&
            <DependentsModal
              profileName={ profile && profile.fullname }
              dependents={ profileDependent && profileDependent }
              onClose={ () => this.setState({ showDependentModal : false }) }
            />
        }
        {
          showPersonalInfoModal &&
            <PersonalInfoModal
              accountNumber={ accountNumber }
              profile={ profile && profile}
              onClose={ () => this.setState({ showPersonalInfoModal : false }) }
            />
        }
        {
          showCompanyInfoModal &&
            <CompanyInfoModal
              profile={ profile && profile}
              lineManager={ lineManager && lineManager.fullName }
              rank={ rank && rank.rank }
              onClose={ () => this.setState({ showCompanyInfoModal : false }) }
            />
        }
        {
          showStaffAccountsModal &&
          <StaffAccountsModal
            onClose={ () => this.setState({  showStaffAccountsModal : false }) }
          />
        }
        <div>
          <Card className={ 'profile-settings-card-view' }>
            <div className={ 'profile-banner' }>
              <div className={ 'profile-picture-card' }>
                <div>
                  {
                    profileImageUrl ?

                    <img src={
                      require(`${ profileImageUrl }`) }
                      className={ 'profile-picture' }/>
                    :
                    <img src={
                      require('../../../images/profile-picture.png') }
                      className={ 'profile-picture' }/>
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
              </div>
              <div>
                <div
                  onClick={ () => this.setState({ showChangePINModal : true }) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings lock-icon' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'Change PIN'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => this.setState({ showPersonalInfoModal : true }) }
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
                  onClick={ () => this.setState({ showContactInfoModal : true }) }
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
                  onClick={ () => this.setState({ showDependentModal : true }) }
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
                  onClick={ () => this.setState({ showCompanyInfoModal : true }) }
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
                  onClick={ () => this.setState({ showStaffAccountsModal : true }) }
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
                profileDescriptions={ profile && profile.description }
                profileRatings={ profile && profile.performanceRating }
              />
            </div>
          </Card>
          <ExperienceFragment
            profileWork={ profile && profile.work }
            profileExperience={ profile && profile.experience }
            />
          <EducationFragment
            profileEducation={ profile && profile.education }
            />
        </div>
        <div>
          <CertificateFragment
            profileCertificate={ profile && profile.certificate } />

          <SkillsFragment
            profileSkills={ profile && profile.skills }/>
        </div>

      </div>
      <div className={ 'profile-settings-grid-column-mobile' }>
      </div>

      <FloatingActionButton
        text="+"
      />
    </div>
    )
  }
}

SettingsProfileCardComponent.propTypes = {
  onClick : PropTypes.func,
  changePinSendToFragment : PropTypes.func,
  profileImageUrl : PropTypes.string,
  rank: PropTypes.object,
  profile: PropTypes.object,
  lineManager: PropTypes.object,
  enabledLoader: PropTypes.bool,
}

export default SettingsProfileCardComponent
