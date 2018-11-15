import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/MyGoalsPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  Checkbox,
  FloatingActionButton
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/myGoalStyles.css'

class MyGoalsFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      goalTitle,
      description,
      startDate,
      dueDate,
      priorityName,
      showPriorityModalFunc
    } = this.props

    return (
      <div className = { 'goal-container' }>
        <div className = { 'goal-grid-column-x3' }>
          <div></div>
          <div>
            <GenericInput
              text = { 'Goal Title' }
              value = { goalTitle }
            />
            <GenericInput
              text = { 'Description' }
              type = { 'textarea' }
              value = { description }
            />
            <div className = { 'grid-global' }>
              <DatePicker
                text = { 'Start Date' }
                selected = { startDate }
              />
              <DatePicker
                text = { 'Due Date' }
                selected = { dueDate }
              />
            </div>
            <GenericInput
              text = { 'Priority' }
              value = { priorityName }
              onClick = { () => showPriorityModalFunc() }
            />
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

MyGoalsFormComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default MyGoalsFormComponent
