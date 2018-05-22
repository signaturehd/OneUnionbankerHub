import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'
import CardBasicInfo from './BasicInformationCardComponent'
import CardCompanyInformation from './CompanyInformationCardComponent'
import MyDependentInformationCardComponent from './MyDependentInformationCardComponent'

class SettingsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank, linemanager } = this.props
     let genderPartial
    if (profile.gender === 'M') {
     genderPartial = 'Male'
    } else {
     genderPartial = 'Female'
    }
    return (
      <div>
      <Card className = { 'profile-card' }>
        <img src = { require('../../../images/profile-picture.png') } className = { 'image-profile' }/>

            <h5 className = {'title-title-profile'}>{ profile.employeeNumber }</h5>
            <h4 className =  {'text-title-profile' }> EMPLOYEE NUMBER </h4>

           <h5 className={'title'}>{ profile.fullname }</h5>
           <h4 className = { 'text-title-profile' }> EMPLOYEE NAME </h4>

           <h5 className = "title">{ profile.birthDate }</h5>
            <h4 className = { 'text-title-profile' }> BIRTH DATE </h4>

            <h5 className = "title">{ genderPartial }</h5>
            <h4 className = { 'text-title-profile' }> GENDER </h4>

            <h5 className = "title"> { profile.status }</h5>
            <h4 className = { 'text-title-profile' }> CIVIL STATUS </h4>

            <h5 className = "title"> +{ profile.email }</h5>
            <h4 className = { 'text-title-profile' }> EMAIL </h4>



            <h5 className = "title"> +{ profile.contactNumber }</h5>
            <h4 className = { 'text-title-profile' }> MOBILE  </h4>



             <h5 className = "title"> { profile.address } </h5>
            <h4 className = { 'text-title-profile' }> COMPANY ADDRESS </h4>

      </Card>
      <Card className = { 'profile-info-secondary' }>
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            defaultChecked />
          <label className = { 'label-tab' } htmlFor = 'tab1'>My Employment Information</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs' />
          <label className = { 'label-tab' } htmlFor='tab2'>My Additional Information</label>

          <input
            className = { 'input-tab' }
            id='tab3'
            type='radio'
            name='tabs' />
          <label className = { 'label-tab' } htmlFor='tab3'>My Dependents Information</label>

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
            linemanager = {linemanager}
            presenter={ this.presenter }
            profile = { profile }
            rank = { rank } />
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
