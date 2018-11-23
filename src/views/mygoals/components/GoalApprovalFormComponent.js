import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/MyGoalsPresenter'

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
import './styles/myGoalStyles.css'

class GoalApprovalFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      employeeName,
      goalId,
      goalTitle,
      approvalStatus,
      description,
      priorityId,
      startDate,
      dueDate,
      goalTypeId,
      showRejectRemarksModal,
      showRejectRemarksFunc,
      onApprovalSubmit,
      onClose,
      rejectedRemarks,
      rejectedRemarksFunc
    } = this.props
    return (
      <div className = { 'grid-form-column' }>
      <div></div>
      <div>
        <Card>
          <div className = { 'grid-global padding' }>
            <div>
              <h2 className = { 'font-size-18px text-align-left font-weight-lighter' }>{employeeName}</h2>
              <h2 className = { 'font-size-18px text-align-left font-weight-bold' }>{goalTitle}</h2>
              <h2 className = { 'font-size-14px text-align-left font-weight-lighter' }>{moment(startDate).format('MMM DD, YYYY')} to {moment(dueDate).format('MMM DD, YYYY')}</h2>
              <br/>
              <h2 className = { 'font-size-18px font-weight-lighter text-align-left' }>Goal description:</h2>
              <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>{ description }</h2>
            </div>
            <div>
              <h2 className = { 'font-size-16px font-weight-lighter text-align-right' }><span className = { 'border' }>{ goalTypeId ? 'Performance' : goalTypeId && 'Developemental' }</span></h2>
            </div>
          </div>
          <Line/>
          {
            showRejectRemarksModal &&
            <Modal
            isDismisable = { true }
            onClose = { () => onClose() }>
              <GenericInput
                text = { 'Remarks' }
                value = { rejectedRemarks }
                onChange = { (e) => rejectedRemarksFunc(e.target.value) }
              />
              <center>
              <div className = { 'grid-global' }>
                <div>
                  <GenericButton
                  text = { 'Close' }
                  onClick = { () => onClose() }/>
                </div>
                <div>
                  <GenericButton
                  text = { 'Submit' }
                  onClick = { () => {
                    onApprovalSubmit(goalId, 3, rejectedRemarks)
                    onClose()
                  }
                 }/>
                </div>
              </div>
              </center>
            </Modal>
          }
          <center>
            <div className = { 'grid-global padding' }>
              <div>
                <GenericButton
                text = { 'Reject' }
                className = { 'button-reject' }
                onClick = { () => showRejectRemarksFunc() }/>
              </div>
              <div>
                <GenericButton
                text = { 'Approve' }
                className = { 'button-approve' }
                onClick = { () => onApprovalSubmit(goalId, 2, '') }/>
              </div>
            </div>
          </center>
        </Card>
      </div>
      <div></div>
      </div>
    )
  }
}

GoalApprovalFormComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default GoalApprovalFormComponent
