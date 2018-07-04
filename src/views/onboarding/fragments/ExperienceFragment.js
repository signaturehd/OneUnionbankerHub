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
import './styles/experienceFragment.css'

class ExperienceFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      experienceForm : [],
    }

    this.addNewExperience = this.addNewExperience.bind(this)
    this.removeExperience = this.removeExperience.bind(this)
  }

  addNewExperience () {
    const { experienceForm } = this.state
    const experienceObj = {
      companyName: '',
      companyAddress: '',
      position: '',
      startYear: '',
      finalYear: '',
    }
    experienceForm.push(experienceObj)
    this.setState({ experienceForm })
  }

  removeExperience (index) {
    const { experienceForm } = this.state
    experienceForm.splice(index)
    this.setState({ experienceForm })
  }

  componentWillUnmount () {
    const { experienceForm } = this.state
    const { setExperience } = this.props
    setExperience(experienceForm)
  }


  render () {
    const { experienceForm } = this.state
    return(
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewExperience()}
            text= {'Add Experience'}
          />
        </center>
        <br/>
        <div className = { 'onboarding-experience-form-container' } >
          {
            experienceForm.length !== 0 &&
            experienceForm.map((experience, key) =>
              <Card
                className = { 'onboarding-experience-form' }
                key = {key}
              >
                <GenericTextBox
                  placeholder = {'Company Name'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedExperience = [...experienceForm]
                      updatedExperience[key].companyName = e.target.value
                      this.setState({ experienceForm: updatedExperience })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Company Address'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedExperience = [...experienceForm]
                      updatedExperience[key].companyAddress = e.target.value
                      this.setState({ experienceForm: updatedExperience })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Position'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedExperience = [...experienceForm]
                      updatedExperience[key].position = e.target.value
                      this.setState({ experienceForm: updatedExperience })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Start Year'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedExperience = [...experienceForm]
                      updatedExperience[key].startYear = e.target.value
                      this.setState({ experienceForm: updatedExperience })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'End Year'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedExperience = [...experienceForm]
                      updatedExperience[key].finalYear = e.target.value
                      this.setState({ experienceForm: updatedExperience })
                    }
                  }
                />
                <br/>
                <GenericButton
                  onClick = { () => this.removeExperience(key) }
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

export default ExperienceFragment
