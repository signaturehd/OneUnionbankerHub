/* import react */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* import redux */
import store from '../../../store'
import { OnboardingActions } from '../../../actions'

/* Generic Components */
import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader,
  CircularLoader
} from '../../../ub-components/'

/* import styles */
import './styles/skillsFragment.css'

class SkillsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      skillsForm : [],
    }

    this.addNewSkill = this.addNewSkill.bind(this)
    this.removeSkill = this.removeSkill.bind(this)
  }

  addNewSkill () {
    const { skillsForm } = this.state
    const experienceObj = {
      skillName: '',
      skillLevel: '',
    }
    experienceForm.push(experienceObj)
    this.setState({ skillsForm })
  }

  removeSkill (index) {
    const { skillsForm } = this.state
    skillsForm.splice(index)
    this.setState({ skillsForm })
  }

  componentWillUnmount () {
    const { skillsForm } = this.state
    store.dispatch(OnboardingActions.addSkills(skillsForm))
  }


  render () {
    const { certificateForm } = this.state
    return(
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewExperience()}
            text= {'Add Experience'}
          />
        </center>
        <br/>
        <div className = { 'onboarding-certificate-form-container' } >
          {
            certificateForm.length !== 0 &&
            certificateForm.map((certificate, key) =>
              <Card
                className = { 'onboarding-certificate-form' }
                key = {key}
              >
                <GenericTextBox
                  placeholder = {'Certificate Name'}
                  maxLength={60}
                  onChange = { e => {
                    const updatedCertificate = [...certificateForm]
                    updatedCertificate[key].skillName = e.target.value
                    this.setState({ certificateForm: updatedCertificate })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Issuing Body'}
                  maxLength={60}
                />
                <GenericButton
                  onClick = { () => this.removeSkill(key) }
                  text= {'Remove Form'}
                />
              </Card>
            )
          }
        </div>
      </div>
    )
  }
}

export default SkillsFragment
