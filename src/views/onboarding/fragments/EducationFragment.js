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
import './styles/educationFragment.css'

class EducationFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      educationForm : [],
    }

    this.addNewEducation = this.addNewEducation.bind(this)
    this.removeEducation = this.removeEducation.bind(this)
  }

  addNewEducation () {
    const { educationForm } = this.state
    const {  } = this.props

    const educationObj = {
      course: '',
      schoolName: '',
      degree: '',
      honor: '',
      startYear: '',
      finalYear: '',
    }
    educationForm.push(educationObj)
    this.setState({ educationForm })
  }

  removeEducation (index) {
    const { educationForm } = this.state
    educationForm.splice(index)
    this.setState({ educationForm })
  }

  componentWillUnmount () {
    const { educationForm } = this.state
    const { setEducation } = this.props
    setEducation(educationForm)
  }

  render () {
    const { educationForm } = this.state
    return (
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewEducation()}
            text= {'Add Education'}
          />
        </center>
        <br/>
        <div className = { 'onboarding-education-form-container' } >
          {
            educationForm.length !== 0 &&
            educationForm.map((education, key) =>
              <Card
                className = { 'onboarding-education-form' }
                key = {key}
              >
                <GenericTextBox
                  placeholder = {'School'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].schoolName = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Degree'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].degree = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Course'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].course = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Special Honors'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].honor = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Start Year'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].startYear = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'End Year'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedEducation = [...educationForm]
                      updatedEducation[key].finalYear = e.target.value
                      this.setState({ educationForm: updatedEducation })
                    }
                  }
                />
                <br/>
                <GenericButton
                  onClick = { () => this.removeEducation(key) }
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

export default EducationFragment
