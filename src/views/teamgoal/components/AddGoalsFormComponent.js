import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

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
import './styles/teamGoal.css'

class AddGoalsFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
      goalTitle,
      goalTitleErrorMessage,
      goalTitleFunc,
      description,
      descriptionFunc,
      descriptionErrorMessage,
      startDate,
      startDateFunc,
      startDateErrorMessage,
      dueDate,
      dueDateFunc,
      dueDateErrorMessage,
      priorityName,
      priorityErrorMessage,
      showPriorityModalFunc,
      goalType,
      goalTypeId,
      goalTypeErrorMessage,
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
        <div className = { 'goal-grid-column-x3' }>
          <div></div>
          <div>
            <div className = { 'grid-global' }>
              <GenericInput
                text = { 'Goal Title' }
                value = { goalTitle }
                onChange = { (e) => goalTitleFunc(e.target.value) }
                disabled = { editMode }
                errorMessage = { goalTitleErrorMessage }
              />
              <GenericInput
                text = { 'Goal Type' }
                value = { goalType ? goalType : goalTypeId===1 ? 'Performance' : goalTypeId==2 ? 'Developemental' : goalType }
                onClick = { () => showGoalTypeModalFunc() }
                disabled = { editMode }
                errorMessage = { goalTypeErrorMessage }
              />
            </div>
            <div className = { 'grid-global' }>
              <DatePicker
                text = { 'Start Date' }
                selected = { startDate && moment(startDate) }
                onChange = { (e) => startDateFunc(e) }
                dateFormat = { 'MM/DD/YYYY' }
                minDate = { moment() }
                errorMessage = { startDateErrorMessage }
              />
              <DatePicker
                text = { 'Due Date' }
                selected = { dueDate && moment(dueDate) }
                onChange = { (e) => dueDateFunc(e) }
                minDate = { startDate ? moment(startDate) : moment() }
                dateFormat = { 'MM/DD/YYYY' }
                errorMessage = { dueDateErrorMessage }
              />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                text = { 'Description' }
                value = { description }
                type = { 'textarea' }
                onChange = { (e) => descriptionFunc(e.target.value) }
                disabled = { editMode }
                errorMessage = { descriptionErrorMessage }
              />
              <GenericInput
                text = { 'Priority' }
                value = { priorityName }
                onClick = { () => showPriorityModalFunc() }
                disabled = { editMode }
                errorMessage = { priorityErrorMessage }
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

AddGoalsFormComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default AddGoalsFormComponent
