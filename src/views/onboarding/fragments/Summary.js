import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import ConnectView from '../../../utils/ConnectView'

import '../components/styles/boarding-styles.css'
import Education from './EducationFragment'
import Experience from './ExperienceFragment'
import Skills from './SkillsFragment'
import Certificate from './CertificateFragment'
import AboutMe from './AboutMeFragment'


class Summary extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const submit = () => {
      alert('submited')
    }
    return (
    <div>
        <Education/>
        <Experience/>
        <Skills/>
        <Certificate/>
        <AboutMe/>
    </div>


    )
  }
}
export default (Summary)
