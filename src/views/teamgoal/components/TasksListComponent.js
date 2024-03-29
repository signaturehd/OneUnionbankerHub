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
          <Card className={ 'comment-border margin-5px padding-5px employee-column' }>
            <Checkbox
              checked = { resp.isCompleted }
            />
          <h2 className = { 'text-align-left margin-auto font-size-14px font-weight-lighter' }
            onClick = { () => onSelected(resp.id, resp.description, resp.isCompleted) }>{resp.description}</h2>
          </Card>
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
