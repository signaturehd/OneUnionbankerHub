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

class TeamGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      viewMoreText : 'View More'
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  checkTpye (id) {
    if(id === 1) {
      return 'Performance'
    }  else  if (2) {
      return 'Developmental'
    }
  }

  render () {
    const {
      priorityFunc,
      onSelected,
      teamGoalsArray
    } = this.props

    const { index, viewMoreText } = this.state
    return (
      <div>
        {
          teamGoalsArray.length !== 0 ?
          teamGoalsArray.map((resp,key) =>
            <div className = { 'padding-15px' }>
              <div>
                <Card className = { 'cursor-pointer' }
                  onClick = { () => onSelected(
                    resp.title,
                    resp.description,
                    resp,
                    resp.startDate,
                    resp.dueDate,
                    resp.id,
                  ) }>
                  <div className = { 'padding-15' }>
                    <div className = { 'header-column-1' }>
                      <div>
                        <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ resp.title }</h2>
                      </div>
                      <div className = { 'text-align-right' }>
                        <h2 className = { 'margin-10px font-size-12px font-weight-lighter' }><span className = { 'border-team color-gray' }>{this.checkTpye(resp.type)}</span></h2>
                      </div>
                    </div>
                    <div></div>
                    <div>
                      <Line/>
                      <div className = { 'grid-footer-column margin-5px' }>
                        <div>
                          <h2
                            className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityFunc(resp.priority)}` }>{ priorityFunc(resp.priority) }</h2>
                        </div>
                        <div></div>
                        <div>
                          <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Start: <b>{ moment(resp.startDate).format('MMM DD, YYYY') }</b></h2>
                          <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Due: <b>{ moment(resp.dueDate).format('MMM DD, YYYY') }</b></h2>
                        </div>
                      </div>
                    </div>

                  </div>
                </Card>
              </div>
            </div>
          )
          :
          <center><h2>No record</h2></center>
        }
      </div>
    )
  }
}

TeamGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default TeamGoalsComponent
