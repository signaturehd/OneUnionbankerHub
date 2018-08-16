import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  MultipleFileUploader,
  DatePicker,
  Line
} from '../../../ub-components/'

import './styles/phenomDetailsStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'


import moment from 'moment'

class PhenomCardDetailsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

  const {
    selectedDetails
  } = this.props
  
  return (
    <div>
    </div>
    )
  }
}

PhenomCardDetailsComponent.propTypes = {
  selectedDetails : PropTypes.array
}

export default PhenomCardDetailsComponent
