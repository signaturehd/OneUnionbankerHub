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
      goalTitleFunc,
      description,
      descriptionFunc,
      startDate,
      startDateFunc,
      dueDate,
      dueDateFunc,
      priorityName,
      showPriorityModalFunc,
      onCancel,
      submit
    } = this.props

    return (
      <div className = { 'goal-container' }>
        <div className = { 'goal-grid-column-x3' }>
          <div></div>
          <div>
            <GenericInput
              text = { 'Goal Title' }
              value = { goalTitle }
              onChange = { (e) => goalTitleFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Description' }
              type = { 'textarea' }
              value = { description }
              onChange = { (e) => descriptionFunc(e.target.value) }
            />
            <div className = { 'grid-global' }>
              <DatePicker
                text = { 'Start Date' }
                selected = { startDate && moment(startDate) }
                onChange = { (e) => startDateFunc(e) }
              />
              <DatePicker
                text = { 'Due Date' }
                selected = { dueDate && moment(dueDate) }
                onChange = { (e) => dueDateFunc(e) }
                minLength = { moment(startDate) }
              />
            </div>
            <GenericInput
              text = { 'Priority' }
              value = { priorityName }
              onClick = { () => showPriorityModalFunc() }
            />
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'Cancel' }
                onClick = { () => onCancel() }
              />
              <GenericButton
                text = { 'Submit' }
                onClick = { () => submit() }
              />
            </div>
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
