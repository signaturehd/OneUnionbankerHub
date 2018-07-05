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
import './styles/aboutFragment.css'

class AboutFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description : null,
      profilePicture : null
    }
  }

  submitExperience () {
    store.dispatch(OnboardingActions.addAbout(aboutForm))
  }

  render () {
    return(
      <div>
        <center>
          <GenericButton className={'generic-button'}
            text= {'Add Experience'}
          />
        </center>
        <div></div>
      </div>
    )
  }
}

export default AboutFragment
