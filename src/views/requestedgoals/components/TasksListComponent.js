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

class TasksListComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const { goalId, cardHolder, onSelected, changeTask } = this.props
    return (
      <div>
      {
        cardHolder.map((resp, key) =>
          <div
            className={ 'requestTask-border margin-5px padding-5px employee-column' }>
            <Checkbox
              value = { resp.isCompleted }
              checked = { resp.isCompleted }
              onChange = { () => changeTask(resp.id , !resp.isCompleted) }
            />
            <h2 className = { 'text-align-left font-size-12px font-weight-lighter cursor-pointer' }
            onClick = { () => onSelected(resp.id, resp.description, resp.isCompleted) }>{resp.description}</h2>
          </div>
        )
      }
      </div>
    )
  }
}

TasksListComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default TasksListComponent
