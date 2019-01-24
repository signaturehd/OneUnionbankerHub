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

class MemberGoalComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 5,
      viewMoreText : 'View More'
    }
  }

  componentDidMount() {
    this.props.showSquadGoal ?
    this.props.getMembersGoals('squad')
    :
    this.props.getMembersGoals('team')
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
      memberId,
      memberArray,
      participantArray,
      participantErrorMessage,
      editMode,
      showGoalTypeModal,
      showGoalTypeModalFunc,
      getMembersGoals,
      checkedMember,
      squadMembers,
      onCancel,
      onSubmit,
      onEdit,
      squadId,
      showSquadGoal
    } = this.props

    const { index, viewMoreText } = this.state
    const isVisible = (memberArray && memberArray.length > 5) ? '' : 'hide'

    return (
      <div className = { 'goal-container' }>
      <br/>
        <div className = { 'goal-grid-column-x3' }>
          <div>
            <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
          </div>
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
            <div>
            <h2 className = { 'text-align-left font-size-16px font-weight-bold' }>Members</h2>
              {
                participantErrorMessage &&
                <span className = {'error-message'}>participantErrorMessage</span>
              }
              {
                squadId ?
                squadMembers.length !== 0 &&
                squadMembers.slice(0, index).map((member, key) =>
                    <Card className = { 'padding-5px' }>
                      <Checkbox
                        label = { member.name }
                        onChange = { () => checkedMember(member.id, participantArray) }/>
                    </Card>
                )
                :
                memberArray.length !== 0 &&
                memberArray.slice(0, index).map((member, key) =>
                    <Card className = { 'padding-5px' }>
                      <Checkbox
                        label = { member.name }
                        onChange = { () => checkedMember(member.id, participantArray) }/>
                    </Card>
                )
              }
              <button
              type = { 'button' }
              className = { `viewmore tooltip ${ isVisible }` }
              onClick = {
                () => {
                  if(index === memberArray.length)
                  this.setState({ index : 5, viewMoreText : 'View more' })
                  else
                  this.setState({ index : memberArray.length, viewMoreText : 'View less' })
                }
              }>
              <img src={ require('../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
              </button>
            </div>
            <div></div>
            </div>
            <br/>
            <Line/>
            <br/>
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

MemberGoalComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func,
  getMembersGoals : PropTypes.func
}

export default MemberGoalComponent
