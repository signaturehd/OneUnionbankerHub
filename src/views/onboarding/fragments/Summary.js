import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import store from '../store'
import { Field, FieldArray, reduxForm , getFormValues} from 'redux-form'

import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import ConnectView from '../../../utils/ConnectView'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import '../components/styles/boardingStyle.css'
import Education from './EducationFragment'
import Experience from './ExperienceFragment'
import Skills from './SkillsFragment'
import Certificate from './CertificateFragment'
import AboutMe from './AboutMeFragment'
import FormValues from '../values'

const submit = () => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

const values  = ({ values }) =>

  <div>
    <code>
      <pre>
        {values ? JSON.stringify(values, 0, 2) : String(values)}
      </pre>
    </code>
  </div>

  connect(state => ({
  values: getFormValues('form')(state)

}))(values)
console.log(values)


const Summary = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (

  <div>
  <div>
    <Card className={'summary-card-component'}>
      <div className={'summary-card-headers'}>
        <h1> Profile Summmary Review
        </h1>
        <br></br><br></br>
        <h2>
          <AboutMe/>
        </h2>
          <br></br><br></br>
        </div>
      </Card>
    </div>
    <br></br>
      <div className={ 'summary-card-container' }>
        <Card className={'summary-card-component'}>
        <div className={'summary-card-headers'}>
                <h2>Education</h2>
              </div>
              <br></br>
              <div>
                <Education/>
                </div>
        </Card>
        <Card className={'summary-card-component'}>
        <div className={ 'summary-card-headers'}>
                <h2> Work Experience</h2>
              </div>
              <br></br>
              <div>
                <Experience/>
                </div>
        </Card>

      </div>
      <br></br>
      <div className={ 'summary-card-container' }>
        <Card className={'summary-card-component'}>
        <div className={'summary-card-headers'}>
                <h2>Skills</h2>
              </div>
              <br></br>
              <div>
                <Skills/>
                </div>
        </Card>
        <Card className={'summary-card-component'}>
        <div className={ 'summary-card-headers'}>
                <h2>Certification</h2>
              </div>
              <br></br>
              <div>
                <Certificate/>
                </div>
        </Card>
        <FormValues />

      </div>
      </div>
  )
}



export default reduxForm({
  form: 'form', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(Summary)
