import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/ApprovalGoalsPresenter'

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
import { convertInitial } from '../../../utils/initialUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/approval.css'

class ConfirmGoalsComponent extends Component {

  constructor(props) {
    super(props)
  }

  navigate () {
    this.props.history.push('/mygoals')
  }

  render () {
    const {
      title,
      approvalStatus,
      priorityFunc,
      type,
      description,
      startDate,
      endDate,
      isSquadGoal,
      goalId,
      isTeamGoal,
      onSelected
    } = this.props

    return (
      <div
        onClick = { ()  =>
          onSelected(
            goalId,
            title,
            approvalStatus,
            priorityFunc,
            type,
            description,
            startDate,
            endDate,
            isSquadGoal,
            isTeamGoal
          )
        }
        className = { 'cursor-pointer' }>
        <div>
          <Card>
            <div className = { 'text-align-left'}>
              <h2
                style = {{
                  background: 'rgb(37, 169, 37)',
                  borderRadius: '3px',
                  color: 'rgb(255, 255, 255)',
                  width: '100px',
                  padding: '5px'
                }}
                className = { 'text-align-center font-size-12px font-weight-lighter description-title' }>{
                isTeamGoal ?
                'Team' : ''
              }</h2>
            </div>
            <div className = { 'padding-15' }>
              <div className = { 'header-column-1' }>
                <div>
                  <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-bold' }>{ title }</h2>
                  <br/>
                  <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ description }</h2>
                {
                  // <Progress
                  //   width = { 65 }
                  //   height = { 65 }
                  //   percent = { 80 }
                  //   className = { 'margin-5px' }
                  // />
                }
                </div>
                <div>
                  <h2
                    style = { {
                      border: '1px solid #595959',
                      borderRadius: '5px',
                      padding: '5px',
                    } }
                    className = { 'text-align-center font-size-12px font-weight-lighter' }>{
                    type === 1 ?
                    'Performance' : ''
                  }
                  {
                    type === 2 ?
                    'Developemental' : ''
                  }</h2>
                </div>

              </div>
              <div></div>
              <div>
                <Line/>
                <div className = { 'grid-footer-column margin-5px' }>
                  <div>
                    <h2 className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityFunc}` }>{ priorityFunc }</h2>
                  </div>
                  <div></div>
                  <div>
                    <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Start Date: <b>{ moment(startDate).format('MMM DD, YYYY') }</b></h2>
                    <br/>
                    <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Due: <b>{ moment(endDate).format('MMM DD, YYYY') }</b></h2>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </div>
      </div>
    )
  }
}

ConfirmGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConfirmGoalsComponent
