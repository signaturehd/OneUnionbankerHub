import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'

import ConnectView from '../../utils/ConnectView'

import Stepper from './components/Steps'
import './components/styles/boarding-styles.css'
import Education from './fragments/Education'
import Experience from './fragments/Experience'
import Skills from './fragments/Skills'
import Certificate from './fragments/Certificate'
import AboutMe from './fragments/AboutMe'

const steps = [
  {
    label: 'Education',
    component: <Education/>,
    exitValidation: false
  },
  {
    label: 'Experience',
    component: <Experience/>
  },
  {
    label: 'Certificate',
    component: <Certificate/>
  },
  {
    label: 'Skills',
    component: <Skills/>

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
      alert('submited');
    }
    return (
          <Stepper steps={steps} onFinish={submit} />
    )
  }
}
export default (OnboardingView)
