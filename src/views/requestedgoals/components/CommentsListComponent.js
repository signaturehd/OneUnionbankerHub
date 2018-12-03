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

class CommentsListComponent extends Component {

  constructor(props) {
    super(props)
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const { cardHolder } = this.props
    return (
      <div>
      {
        cardHolder.commentDetails.map((resp, key) =>
          (
            <div className = { 'employee-column' }>
              <img src = { require('../../../images/1uhub.png') } width = { '50px' } height = { '50px' }/>
              <div className={ 'comment-border margin-5px padding-5px' }>
                <h2 className = { 'text-align-left font-size-12px font-weight-bold unionbank-color' }> {resp.employeeName}</h2>
                <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>{resp.description}</h2>
              </div>
            </div>
          )
        )
      }
      </div>
    )
  }
}

CommentsListComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default CommentsListComponent
