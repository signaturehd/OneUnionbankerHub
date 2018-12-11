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

class ApprovedGoalsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      viewMoreText : 'View More'
    }
  }

  navigate () {
    this.props.history.push('/mygoals')
  }

  render () {
    const {
      cardHolder,
      employeeName,
      imageUrl,
      priorityFunc,
      showApprovalFormFunc,
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

    const {
      index,
      viewMoreText
    } = this.state

    const isVisible = (cardHolder && cardHolder.length > 1) ? '' : 'hide'

    return (
      <div className = { 'grid-main' }>
        <div>
          <div className = { 'employee-column' }>
            <img src = { require('../../../images/1uhub.png') } width = { '60px' } height = { '50px' }/>
            <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-lighter' }>{employeeName}</h2>
          </div>
          {
            cardHolder &&
            cardHolder.slice(0, index).map((details, key) =>

              <Card className = { 'margin-10px' }
                onClick = { () => showApprovalFormFunc(
                  employeeName,
                  details.id,
                  details.title,
                  details.approvalStatus,
                  details.description,
                  details.priority,
                  details.startDate,
                  details.endDate,
                  details.type
                ) }>
                <div className = { 'padding-15' }>
                  <div className = { 'header-column-1' }>
                    <div>
                      <h2 className = { 'margin-10px text-align-left font-size-12px font-weight-lighter' }>{ details.title }</h2>
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
                      {
                        details.approvalStatus === 2 ?
                        <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-Low' }>Approved</h2>
                        :
                          details.approvalStatus === 3 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-High' }>Rejected</h2>
                          :
                          details.approvalStatus === 1 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-gray' }>Requested</h2>
                          :
                          details.approvalStatus === 4 ?
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-gray' }>Update for approval</h2>
                          :
                          details.approvalStatus === 5 &&
                          <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-bold color-gray' }>Deletion for approval</h2>
                      }
                      <h2 className = { 'margin-10px text-align-right font-size-12px font-weight-lighter color-gray' }>Personal</h2>
                    </div>

                  </div>
                  <div></div>
                  <div>
                    <Line/>
                    <div className = { 'grid-footer-column margin-5px' }>
                      <div>
                        <h2 className = { `margin-5px text-align-right font-size-12px font-weight-bold color-${priorityFunc(details.priority)}` }>{ priorityFunc(details.priority) }</h2>
                      </div>
                      <div></div>
                      <div>
                        <h2 className = { 'text-align-right font-size-11px font-weight-lighter color-gray' }>Due: <b>{ moment(details.endDate).format('MMM DD, YYYY') }</b></h2>
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            )
          }
          <button
            type = { 'button' }
            className = { `viewmore tooltip ${ isVisible }` }
            onClick = {
              () => {
                if(index === cardHolder.length)
                  this.setState({ index : 1, viewMoreText : 'View more' })
                else
                  this.setState({ index : cardHolder.length, viewMoreText : 'View less' })
              }
            }>
            <img src={ require('../../../images/icons/horizontal.png') } />
            <span className={ 'tooltiptext' }>{ viewMoreText }</span>
          </button>
        </div>
        <div>
          <div className = { 'padding-10px' }>
            <Card className = { 'padding-10px' }>
            <div className = { 'grid-global padding' }>
              <div>
                <h2 className = { 'font-size-14px text-align-left font-weight-lighter' }>{employeeName}</h2>
                <h2 className = { 'font-size-12px text-align-left font-weight-bold' }>{goalTitle}</h2>
                <h2 className = { 'font-size-12px text-align-left font-weight-lighter' }>{moment(startDate).format('MMM DD, YYYY')} to {moment(dueDate).format('MMM DD, YYYY')}</h2>
                <br/>
                <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>Goal description:</h2>
                <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ description }</h2>
              </div>
              <div>
                <h2 className = { 'font-size-12px font-weight-lighter text-align-right' }><span className = { 'border' }>{ goalTypeId ? 'Performance' : goalTypeId ? 'Developemental' : 'x' }</span></h2>
              </div>
            </div>
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
                  className = { 'button-reject profile-button-small' }
                  onClick = { () => showRejectRemarksFunc() }/>
                </div>
                <div>
                  <GenericButton
                  text = { 'Approve' }
                  className = { 'button-approve profile-button-small' }
                  onClick = { () => onApprovalSubmit(goalId, 2, '') }/>
                </div>
              </div>
            </center>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

ApprovedGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ApprovedGoalsComponent
