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

class HistoryListComponent extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
      cardHolder,
      action,
      dateTime,
    } = this.props

    return (
      <div>
        {
          <div className={ 'grid-global margin-5px padding-5px' }>
            <h2 className = { 'text-align-left font-size-12px font-weight-bold' }>{action}</h2>
          <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>{moment(dateTime).fromNow()}</h2>
          </div>
        }
        <Line/>
      </div>
    )
  }
}

HistoryListComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default HistoryListComponent
