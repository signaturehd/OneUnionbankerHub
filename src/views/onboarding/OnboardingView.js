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
import OnboardingSummary from './fragments/OnboardingSummary'

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
      about : []
    }

    this.addFormArray = this.addFormArray.bind(this)
    this.removeFormArray = this.removeFormArray.bind(this)
  }

  addFormArray (form, data) {
    const {
      education,
      skills,
      experience,
      certificate,
      about
    } = this.state

    switch (form) {
      case 'education':
          const updatedEducation = [...education]
          updatedEducation.push(data)
          this.setState({ education : updatedEducation })
        break
      case 'experience':
          const updatedExperience = [...experience]
          updatedExperience.push(data)
          this.setState({ experience : updatedExperience })
        break
      case 'skills':
          const updatedSkills = [...skills]
          updatedSkills.push(data)
          this.setState({ skills : updatedSkills })
        break
      case 'certificate':
          const updatedCertificate = [...certificate]
          updatedCertificate.push(data)
          this.setState({ certificate : updatedCertificate })
        break
        case 'about':
            const updatedaboutMe = [...about]
            updatedaboutMe.push(data)
            this.setState({ about : updatedaboutMe })
          break
    }
  }

  removeFormArray (form, index) {
    const {
      education,
      skills,
      experience,
      certificate,
      about
    } = this.state

    switch (form) {
      case 'education':
          const updatedEducation = [...education]
          updatedEducation.splice(index)
          this.setState({ education : updatedEducation })
        break
      case 'experience':
          const updatedExperience = [...experience]
          updatedExperience.splice(index)
          this.setState({ experience : updatedExperience })
        break
      case 'skills':
          const updatedSkills = [...skills]
          updatedSkills.splice(index)
          this.setState({ skills : skills })
        break
      case 'certificate':
          const updatedCertificate = [...certificate]
          updatedCertificate.splice(index)
          this.setState({ certificate : updatedCertificate })
        break
      case 'about':
          const updatedaboutMe = [...about]
          updatedaboutMe.splice(index)
          this.setState({ about : updatedaboutMe })
        break
    }
  }

  updateArray (form, data) {
    const {
      education,
      skills,
      experience,
      certificate,
      about
    } = this.state

    switch (form) {
      case 'education':
          this.setState({ education : data })
        break
      case 'experience':
          this.setState({ experience : data })
        break
      case 'skills':
          this.setState({ skills : data })
        break
      case 'certificate':
          this.setState({ certificate : data })
        break
        case 'about':
            this.setState({ about : data })
          break
    }
  }


  render () {
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
          education = { (education) => this.addFormArray('education' , education) }
          removeForm = { (index) => this.removeFormArray('education', index) }
          educationForm = { education }
          updateArray = { (education) => this.updateArray('education', education) }
        />
      },
      {
        label: 'Experience',
        component: <Experience
          setExperience = { (experience) => this.setState({ experience }) }
          experience = { (experience) => this.addFormArray('experience' , experience) }
          removeForm = { (index) => this.removeFormArray('experience', index) }
          experienceForm = { experience }
          updateArray = { (experience) => this.updateArray('experience', experience) }
        />
      },
      {
        label: 'Certificate',
        component: <Certificate
          setCertificate = { (certificate) => this.setState({ certificate }) }
          certificate = { (certificate) => this.addFormArray('certificate' , certificate) }
          removeForm = { (index) => this.removeFormArray('certificate', index) }
          certificateForm = { certificate }
          updateArray = { (certificate) => this.updateArray('certificate', certificate) }
        />
      },
      {
        label: 'Skills',
        component: <Skills
          setSkills = { (skills) => this.setState({ skills }) }
          skills = { (skills) => this.addFormArray('skills' , skills) }
          removeForm = { (index) => this.removeFormArray('skills', index) }
          skillsForm = { skills }
          updateArray = { (skills) => this.updateArray('skills', skills) }
        />
      },
      {
        label: 'About Me',
        component: <AboutMe
          setAbout = { (about) => this.setState({ about }) }
          aboutForm = { about }
          about = { (about) => this.addFormArray('about' , about) }
          removeForm = { (index) => this.removeFormArray('about', index) }
          updateArray = { (about) => this.updateArray('about', about) }

        />
      },
      {
        label: 'Profile Summary',
        component: <OnboardingSummary
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
