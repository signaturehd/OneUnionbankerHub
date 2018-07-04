/* React Dependencies */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Imports
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

// Major Fragments
import Education from './fragments/EducationFragment'
import Experience from './fragments/ExperienceFragment'
import Skills from './fragments/SkillsFragment'
import Certificate from './fragments/CertificateFragment'
import AboutMe from './fragments/AboutMeFragment'
import Summary from './fragments/Summary'
import FormValues from './values'

// Presenter
import Presenter from './presenter/OnboardingPresenter'

// Other Components
import Stepper from './components/StepsComponent'
import './components/styles/boardingStyle.css'

class OnboardingView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      education : [],
      experience : [],
      certificate : [],
      skills : [],
      about : [],
    }
  }

  render () {
    console.log(this.state)
    const {
      education,
      experience,
      skills,
      certificate,
      about,
    } = this.state

    const steps = [
      {
        label: 'Education',
        component: <Education
          setEducation = { (education) => this.setState({ education }) }
          educationForm = { education }
        />
      },
      {
        label: 'Experience',
        component: <Experience
          setExperience = { (experience) => this.setState({ experience }) }
          experienceForm = { experience }
        />
      },
      {
        label: 'Certificate',
        component: <Certificate
          setCertificate = { (certificate) => this.setState({ certificate }) }
          certificateForm = { certificate }
        />
      },
      {
        label: 'Skills',
        component: <Skills
          setSkills = { (skills) => this.setState({ skills }) }
          skillsForm = { skills }
        />
      },
      {
        label: 'About Me',
        component: <AboutMe
          setAbout = { (about) => this.setState({ about }) }
          aboutForm = { about }
        />
      },
      {
        label: 'Profile Summary',
        component: <Summary
          education = { education }
          experience = { experience }
          certificate = { certificate }
          skills = { skills }
          about = { about }
        />
      }
    ]
    return (
      <div>
        <Stepper steps = {steps} />
      </div>
    )
  }
}


export default OnboardingView
