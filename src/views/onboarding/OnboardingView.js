import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import store from './store'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'

import ConnectView from '../../utils/ConnectView'

import Stepper from './components/StepsComponent'
import './components/styles/boardingStyle.css'
import Education from './fragments/EducationFragment'
import Experience from './fragments/ExperienceFragment'
import Skills from './fragments/SkillsFragment'
import Certificate from './fragments/CertificateFragment'
import AboutMe from './fragments/AboutMeFragment'
import Summary from './fragments/Summary'
import FormValues from './values'


const steps = [
  {
    label: 'Education',
    component: <Provider store={store}>
      <Education onSubmit={'submit'} />
  </Provider>,
    exitValidation: false
  },
  {
    label: 'Experience',
    component: <Provider store={store}>
      <Experience onSubmit={'To do: add submit function'} />
  </Provider>,
  },
  {
    label: 'Certificate',
    component: <Provider store={store}>
      <Certificate onSubmit={'To do: add submit function'} />
  </Provider>,
  },
  {
    label: 'Skills',
    component: <Provider store={store}>
      <Skills onSubmit={'To do: add submit function'} />
  </Provider>,
  },
  {
    label: 'About Me',
    component: <Provider store={store}>
      <AboutMe onSubmit={'To do: add submit function'} />
  </Provider>,
  },
  {
    label: 'Profile Summary',
    component: <Provider store={store}>
      <Summary />
              </Provider>,
  }
]

class OnboardingView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const submit = () => {
    alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }


    return (
      <div>
          <Stepper steps={ steps } onFinish={ submit } />

        </div>

    )
  }
}
export default (OnboardingView)
