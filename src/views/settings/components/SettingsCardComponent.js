import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles/settings.css'
import CardBasicInfo from './BasicInformationCardComponent'
import CardCompanyInformation from './CompanyInformationCardComponent'
import MyDependentInformationCardComponent from './MyDependentInformationCardComponent'

class SettingsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank, linemanager, profileDependent } = this.props
    let genderPartial
    if (profile.gender === 'M') {
      genderPartial = 'Male'
    } else {
      genderPartial = 'Female'
    }
    return (
      <div>
      <Card className={ 'profile-card' }>
        <img src = { require('../../../images/profile-picture.png') } className={ 'image-profile' }/>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeId' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ 'title-title-profile' }>{ profile.employeeNumber ? profile.employeeNumber : "(Not Yet Provided)" }</h5>
            <h4 className={ 'text-title-profile' }> EMPLOYEE NUMBER </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeFullName' }/>
            <div></div>
          </div>
          <div>
            <h5 className={'title'}>{ profile.fullname ? profile.fullname : "(Not Yet Provided)" }</h5>
            <h4 className={ 'text-title-profile' }> EMPLOYEE NAME </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeBdate' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }>{ profile.birthDate ? profile.birthDate  : "(Not Yet Provided)" }</h5>
            <h4 className={ 'text-title-profile' }> BIRTH DATE </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeGender' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }>{ genderPartial ? genderPartial : "(Not Yet Provided)" }</h5>
            <h4 className={ 'text-title-profile' }> GENDER </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeCivilStatus' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }> { profile.civilstatus ? profile.civilstatus : "(Not Yet Provided)" }</h5>
            <h4 className={ 'text-title-profile' }> CIVIL STATUS </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeEmail' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }> { profile.email ? profile.email : "(Not Yet Provided)"  }</h5>
            <h4 className={ 'text-title-profile' }> EMAIL </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeMobileNumber' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }> +{ profile.contactNumber ? profile.contactNumber : "(Not Yet Provided)"  }</h5>
            <h4 className={ 'text-title-profile' }> MOBILE NUMBER  </h4>
          </div>
        </div>
        <div className={ 'profile-settings-grid' }>
          <div>
            <div></div>
            <span className={ 'icon-settings employeeHomeAddress' }/>
            <div></div>
          </div>
          <div>
            <h5 className={ "title" }> { profile.address ? profile.address  : "(Not Yet Provided)" } </h5>
            <h4 className={ 'text-title-profile' }> COMPANY ADDRESS </h4>
          </div>
        </div>
      </Card>
      <Card className={ 'profile-info-secondary' }>
        <div className={ 'tabs-container' }>
          <input
            className={ 'input-tab' }
            id={ 'tab1' }
            type={ 'radio' }
            name={ 'tabs' }
            defaultChecked />
          <label className={ 'label-tab' } htmlFor={ 'tab1' }>My Employment Information</label>

          <input
            className={ 'input-tab' }
            id={ 'tab2' }
            type={ 'radio' }
            name={ 'tabs' }/>
          <label className={ 'label-tab' } htmlFor={ 'tab2' }>My Additional Information</label>

          <input
            className={ 'input-tab' }
            id={ 'tab3' }
            type={ 'radio' }
            name={ 'tabs' } />
          <label className={ 'label-tab' } htmlFor={ 'tab3' }>My Dependents Information</label>

          <section id='content1'>
            <CardBasicInfo
            linemanager = {linemanager}
            presenter={ this.presenter }
            profile = { profile }
            rank= { rank } />
          </section>

          <section id='content2'>
            <CardCompanyInformation
            linemanager = {linemanager}
            presenter={ this.presenter }
            profile = { profile }
            rank = { rank } />
          </section>

          <section id='content3'>
            <MyDependentInformationCardComponent
            presenter={ this.presenter }
            profileDependent = { profileDependent }
            profile = { profile }
            />
          </section>
        </div>

      </Card>
    </div>
    )
  }
}

SettingsCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default SettingsCardComponent
