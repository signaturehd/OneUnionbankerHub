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

class SquadGoalsComponent extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
      memberDetails,
      squadId,
      squadName,
      description,
      productOwner,
      onSelected
    } = this.props

    return (
      <div>
      {
          <Card className = { 'margin-10px cursor-pointer' }
            onClick = { () => onSelected(
              squadId,
              squadName,
              description,
              memberDetails
            ) }>
            <div className = { 'padding-15' }>
            <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ squadName }</h2>
            <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter color-gray' }>{ description }</h2>
            </div>
          </Card>
      }
      </div>
    )
  }
}

SquadGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default SquadGoalsComponent
