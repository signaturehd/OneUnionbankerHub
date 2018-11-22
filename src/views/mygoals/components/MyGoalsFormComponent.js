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
      goalType,
      editMode,
      showGoalTypeModal,
      showGoalTypeModalFunc,
      onCancel,
      onSubmit,
      onEdit
    } = this.props

    return (
      <div className = { 'goal-container' }>
        <br/>
        <Line/>
        <br/>
        <div className = { 'goal-grid-column-x3' }>
          <div></div>
          <div>
            <div className = { 'grid-global' }>
              <GenericInput
                text = { 'Goal Title' }
                value = { goalTitle }
                onChange = { (e) => goalTitleFunc(e.target.value) }
                disabled = { editMode }
              />
              <GenericInput
                text = { 'Goal Type' }
                value = { goalType }
                onClick = { () => showGoalTypeModalFunc() }
                disabled = { editMode }
              />
            </div>
            <div className = { 'grid-global' }>
              <DatePicker
                text = { 'Start Date' }
                selected = { startDate && moment(startDate) }
                onChange = { (e) => startDateFunc(e) }
                disabled = { editMode }
                dateFormat = { 'MM/DD/YYYY' }
                minDate = { moment() }
              />
              <DatePicker
                text = { 'Due Date' }
                selected = { dueDate && moment(dueDate) }
                onChange = { (e) => dueDateFunc(e) }
                minDate = { startDate ? moment(startDate) : moment() }
                dateFormat = { 'MM/DD/YYYY' }
              />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                text = { 'Description' }
                value = { description }
                type = { 'textarea' }
                onChange = { (e) => descriptionFunc(e.target.value) }
                disabled = { editMode }
              />
              <GenericInput
                text = { 'Priority' }
                value = { priorityName }
                onClick = { () => showPriorityModalFunc() }
                disabled = { editMode }
              />
            </div>
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'Cancel' }
                onClick = { () => onCancel() }
              />
              <GenericButton
                text = { editMode ? 'Update' : 'Submit' }
                onClick = { () => {
                    editMode ?
                    onEdit()
                    :
                    onSubmit()
                  }
                }
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
