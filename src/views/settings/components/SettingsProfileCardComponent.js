import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../ub-components/'
import SettingsOtherInformationComponent from './SettingsOtherInformationComponent'

import ContactInfoModal from '../modals/ContactsModal'
import DependentsModal from '../modals/DependentsModal'
import SkillsComponent from '../../common/components/ProfileComponents/SkillsComponent'
import ExperienceComponent from '../../common/components/ProfileComponents/ExperienceComponent'
import CertificateComponent from '../../common/components/ProfileComponents/CertificateComponent'

import './styles/profileSettings.css'

class SettingsProfileCardComponent extends Component {

  constructor (props) {
    super(props)
      this.state={
        showContactInfoModal : false,
        showDependentModal : false
      }
  }

  render () {
    const {
      profile,
      onClick,
      rank,
      lineManager,
      profileImageUrl }=this.props

    const { showContactInfoModal, showDependentModal }=this.state

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
          showContactInfoModal &&
            <ContactInfoModal
              profileName={ profile && profile.fullname }
              profileEmail={ profile && profile.email }
              profileNumber={ profile && profile.contactNumber }
              onClose={ () => this.setState({ showContactInfo : false }) }
            />
        }
        {
          showDependentModal &&
            <DependentsModal
              profileName={ profile && profile.fullname }
              profileDependent={ profile && profile.dependents }
              onClose={ () => this.setState({ showDependentModal : false }) }
            />
        }
        <div>
          <Card className={ 'profile-settings-card-view' }>
            <div className={ 'profile-banner' }>
              <div className={ 'profile-picture-card' }>
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
                <div className={ 'profile-information-view-right' }>
                  <div>
                     <span className={ 'profile-icon-settings employeeWorkClass' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label' }>
                      { profile.workClass ? profile.workClass : '(Not Yet Provided)'  }
                    </h5>
                  </div>
                </div>
                <div className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeRank' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label' }>
                      { rank.rank ? rank.rank : '(Not Yet Provided)'  }
                    </h5>
                  </div>
                </div>
                <div
                  onClick={ () => this.setState({ showContactInfo : true }) }
                  className={ 'profile-information-view-right' }>
                  <div>
                    <span className={ 'profile-icon-settings employeeDependent' }/>
                  </div>
                  <div>
                    <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                      { 'See contact info'  }
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={ 'profile-padding' }>
              <br/><Line/><br/>
            </div>
            <div>
              <SettingsOtherInformationComponent
                profile={ profile }
              />
            </div>
          </Card>
          <ExperienceComponent
            profileWork={ profile && profile.work }
            profileEducation={ profile && profile.education }
            />
          <SkillsComponent
            profileSkills={ profile && profile.skills }/>
        </div>
        <div>
          <CertificateComponent />
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
  profileImageUrl : PropTypes.string
}

export default SettingsProfileCardComponent
