import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'

import ConnectView from '../../utils/ConnectView'

import Stepper from './components/StepsComponent'
import './components/styles/boarding-styles.css'
import Education from './fragments/EducationFragment'
import Experience from './fragments/ExperienceFragment'
import Skills from './fragments/SkillsFragment'
import Certificate from './fragments/CertificateFragment'
import AboutMe from './fragments/AboutMeFragment'
const steps = [
  {
    label: 'Education',
    component: <Provider store={store}>
      <Education onSubmit={'handleSubmit'} />
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
    component: <AboutMe/>

  },
  {
    label: 'Profile Summary',
    component: <div>Coming soon</div>

  }
]

class OnboardingView extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const submit = () => {
      alert('submited')
    }
    return (
          <Stepper steps={ steps } onFinish={ submit } />
    )
  }
}
export default (OnboardingView)
