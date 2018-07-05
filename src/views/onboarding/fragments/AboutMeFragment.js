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
  }

  render () {
    return(
      <div>
      </div>
    )
  }
}

export default AboutFragment
