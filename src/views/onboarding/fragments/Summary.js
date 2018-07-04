import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import store from '../store'
import { Field, FieldArray, reduxForm , getFormValues} from 'redux-form'

import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import ConnectView from '../../../utils/ConnectView'
import { GenericTextBox,  Card, GenericButton, FileUploader, Line } from '../../../ub-components/'

import './styles/summary.css'

import Education from './EducationFragment'
import Experience from './ExperienceFragment'
import Skills from './SkillsFragment'
import Certificate from './CertificateFragment'
import AboutMe from './AboutMeFragment'
import FormValues from '../values'

const values  = ({ values }) =>


      <pre>
        {values ? JSON.stringify(values, 0, 2) : String(values)}
      </pre>

  connect(state => ({
  values: getFormValues('form')(state)

}))(values)

const submit = values => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };




const Summary = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
  <div>
    <div className={ 'profile-settings-grid-column-desktop' }>

      <div>
        <Card className={ 'profile-settings-card-view' }>
          <div className={ 'profile-banner' }>
            <div className={ 'profile-picture-card' }>


                <img src={
                  require('../../../images/profile-picture.png') }
                  className={ 'profile-picture' }/>

            </div>
          </div>
          <div className={ 'profile-information-view' }>
            <div className={ 'profile-padding' }>
              <h1 className={ 'profile-name' }>
                UNIONBANKER SURNAME170000
              </h1>
              <h2 className={ 'profile-position' }>
                Probationary
              </h2>
              <h2 className={ 'profile-margin-label' }>
                Onyx Road, Cor Meralco Ave Pasig City
              </h2>
            </div>
            <div>
              <div
                className={ 'profile-information-view-right' }>
                <div>
                  <span className={ 'profile-icon-settings employeeContact' }/>
                </div>
                <div>
                  <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                  </h5>
                </div>
              </div>
              <div
                className={ 'profile-information-view-right' }>
                <div>
                  <span className={ 'profile-icon-settings employeeDependent' }/>
                </div>
                <div>
                  <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                  </h5>
                </div>
              </div>
              <div
                className={ 'profile-information-view-right' }>
                <div>
                  <span className={ 'profile-icon-settings employeeDependent' }/>
                </div>
                <div>
                  <h5 className={ 'profile-margin-label profile-cursor-pointer' }>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className={ 'profile-padding' }>
            <br/><Line/><br/>
          </div>
          <div>
            <AboutMe
            />
          </div>
        </Card>
        <Experience
          />
          <Education/>
      </div>
      <div>
        <Certificate
         />

        <Skills
        />
        <FormValues/>
        
      </div>
    </div>
    <div className={ 'profile-settings-grid-column-mobile' }>
    </div>
  </div>
  )
}



export default reduxForm({
  form: 'form', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(Summary)
