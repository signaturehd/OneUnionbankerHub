/* import react */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* import generic components */
import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader,
  Line
} from '../../../ub-components/'

/* import generated styles */
import './styles/onboardingSummary.css'

class OnboardingSummary extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    const {
      education,
      skills,
      certificate,
      profileDescription,
      profileImage,
      experience,
    } = this.props

    console.log(this.props)

    return (
      <div>


      </div>
    )
  }
}

OnboardingSummary.propTypes = {
  education : PropTypes.array,
  experience : PropTypes.array,
  skills : PropTypes.array,
  certificate : PropTypes.array,
  profileDescription : PropTypes.string,
  profileImage : PropTypes.string,
}

export default OnboardingSummary
