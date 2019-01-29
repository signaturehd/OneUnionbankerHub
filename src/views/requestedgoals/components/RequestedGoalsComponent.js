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
import './styles/requestedGoal.css'

class RequestedGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMygoal : true
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  checkIfTeamGoal (resp) {
    if(this.state.isMygoal) {
      return resp && resp.approvalStatus === 2
    } else {
      return resp && resp.approvalStatus !==2
    }
  }

  render () {
    const {
      cardHolder,
      priorityFunc,
      onSelected,
      onDeleted,
      filterId,
      searchString
    } = this.props

    const {
      isMygoal
    } = this.state

    let goalList = cardHolder
    const search = searchString && searchString.trim().toLowerCase()
    if (search.length > 0) {
      goalList = cardHolder.filter(goal => goal.title.toLowerCase().match(search))
    }

    return (
      <div>
      <center className = { 'grid-global' }>
        <GenericButton
          className = { 'profile-button-medium' }
          text = { 'My Goals' }
          onClick = { () => this.setState({ isMygoal: true }) }
          />
        <GenericButton
          className = { 'profile-button-medium' }
          text = { 'Goals Pending Manager Approval' }
          onClick = { () => this.setState({ isMygoal: false }) }
          />
      </center>
      <br/>
      <Line/>
      <br/>
      {
        goalList &&
        goalList.map((resp, key) => (
          this.checkIfTeamGoal(resp) &&
          <Card>
            <div className = { 'padding-15' }>
              <div className = { 'header-column' }>
                <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ resp.title }</h2>
                {
                  resp.approvalStatus !== 5 &&
                  <span className = { 'icon-check icon-delete-img' } onClick = { () => onDeleted(resp.id) }/>
                }
              </div>
              <div className = { 'header-column-1 cursor-pointer' } onClick = { () =>
                 {
                   if(resp.approvalStatus === 2) {
                     onSelected(
                       resp.id,
                       resp.title,
                       resp.description,
                       resp.startDate,
                       resp.endDate,
                       priorityFunc(resp.priority),
                       resp.approvalStatus,
                       resp.type,
                       resp.isTeamGoal,
                       resp.isSquadGoal,
                       resp.isCompleted,
                       resp.rating && resp.rating ? resp.rating : 0.0
                     )
                   }
                 }}>
                <div>
                  {
                    resp.approvalStatus === 2 ?
                    <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-Medium' }>Approved</h2>
                    :
                      resp.approvalStatus === 3 ?
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-High' }>Rejected</h2>
                      :
                      resp.approvalStatus === 1 ?
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-gray' }>Requested</h2>
                      :
                      resp.approvalStatus === 4 ?
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-gray' }>Update for approval</h2>
                      :
                      resp.approvalStatus === 5 ?
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-gray' }>Deletion for approval</h2>
                      :
                      resp.approvalStatus === 6 &&
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-bold color-Low' }>Completed</h2>
                  }
                </div>
                <div>
                  <h2
                    style = {{
                      background: '#25a925',
                      borderRadius: '3px',
                      color: '#fff'
                    }}
                    className = { 'margin-10px text-align-center font-size-12px font-weight-lighter' }>{
                    resp.isTeamGoal ?
                    'Team'
                    :
                      resp.isSquadGoal ?
                      'Squad'
                      :
                      'Personal'
                  }</h2>
                </div>
              </div>
              <div></div>
              <div>
                <Line/>
                <div className = { 'details-footer-column margin-5px' }>
                  <div>
                    <h2 className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityFunc(resp.priority)}` }>{ priorityFunc(resp.priority) }</h2>
                  </div>
                  <div></div>
                  <div>
                    <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Due: <b>{ moment(resp.endDate).format('MMM DD, YYYY') }</b></h2>
                  </div>
                </div>
              </div>

            </div>
          </Card>
          )
        )
      }
      </div>
    )
  }
}

RequestedGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default RequestedGoalsComponent
