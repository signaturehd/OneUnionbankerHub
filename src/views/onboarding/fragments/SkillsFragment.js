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
    const { skillsForm, skills } = this.props
    const skillsObj = {
      skillName: '',
      skillLevel: '',
    }
    skills(skillsObj)
  }

  removeSkill (index) {
    const { removeFormArray } = this.props
    removeFormArray(index)
  }


  render () {
    const { skillsForm, updateArray } = this.props
    return (
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewSkill()}
            text= {'Add Skill'}
          />
        </center>
        <br/>
        <div className = { 'onboarding-certificate-form-container' } >
          {
            skillsForm.length !== 0 &&
            skillsForm.map((skills, key) =>
              <Card
                className = { 'onboarding-certificate-form' }
                key = {key}
              >
                <GenericTextBox
                  placeholder = {'Skill Name'}
                  maxLength={60}
                  value = { skills.skillName }
                  onChange = { e => {
                      const updatedSkills = [...skillsForm]
                      updatedSkills[key].skillName = e.target.value
                      updateArray(updatedSkills)
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Skill Level'}
                  maxLength={60}
                  value = { skills.skillLevel }
                  onChange = { e => {
                      const updatedSkills = [...skillsForm]
                      updatedSkills[key].skillLevel = e.target.value
                      updateArray(updatedSkills)
                    }
                  }
                />
                <br/>
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
