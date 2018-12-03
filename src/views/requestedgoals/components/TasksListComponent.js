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
    const { goalId, cardHolder, onEdit } = this.props
    return (
      <div className = { 'padding-15px' }>
      {
        cardHolder.map((resp, key) =>
          <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>&#8226; {resp.description}</h2>
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
