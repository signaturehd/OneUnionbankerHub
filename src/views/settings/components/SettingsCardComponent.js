import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'
import CardBasicInfo from './BasicInformationCardComponent'
import CardCompanyInformation from './CompanyInformationCardComponent'

class SettingsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank, linemanager } = this.props
    return (
      <div>
      <Card className = { 'profile-card' }>
        <img src = { require('../../../images/profile-picture.png') } className = { 'image-profile' }/>
           <h4>{ profile.fullname }</h4>
           <h4 className = { 'text-title-profile' }> EMPLOYEE NAME </h4>

           <h5 className = "title"> { profile.position } </h5> 
            <h4 className = { 'text-title-profile' }> POSITION </h4>

           <h5 className = "title">{ profile.employeeNumber }</h5>
            <h4 className = { 'text-title-profile' }> EMPLOYEE NUMBER </h4> 

            <h5 className = "title"> +{ profile.contactNumber }</h5>
            <h4 className = { 'text-title-profile' }> CONTACT # </h4>

            <h5 className = "title">{ profile.workClass }</h5>
            <h4 className = { 'text-title-profile' }> CLASS </h4>

      </Card>
      <Card className = { 'profile-info-secondary' }>
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            defaultChecked />
          <label className = { 'label-tab' } htmlFor = 'tab1'>Basic Information</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs' />
          <label className = { 'label-tab' } htmlFor='tab2'>Company Information</label>

          <section id='content1'>
            <CardBasicInfo presenter={ this.presenter } profile = { profile }/>
          </section>
          <section id='content2'>
            <CardCompanyInformation 
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
